import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Classifying waste with Lovable AI...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image of waste and classify it with volume estimation. Return ONLY valid JSON in this exact format:
{
  "wasteType": "plastic" | "metal" | "organic" | "glass" | "paper" | "electronic" | "textile" | "mixed" | "other",
  "confidence": 0.95,
  "subCategory": "specific type like PET bottle, aluminum can, etc",
  "recyclable": true | false,
  "estimatedWeight": "approximate weight in kg",
  "volumeEstimation": {
    "estimatedVolume": "volume in liters or cubic meters (e.g., '2.5 liters' or '0.5 m³')",
    "dimensions": "approximate dimensions (e.g., '30cm x 20cm x 15cm')",
    "sizeCategory": "small" | "medium" | "large" | "extra-large",
    "confidenceLevel": 0.85,
    "estimationMethod": "brief explanation of how volume was estimated"
  },
  "environmentalImpact": "brief description of environmental impact",
  "disposalRecommendation": "how to properly dispose of this waste"
}

For volume estimation:
- Analyze spatial relationships, shadows, and reference objects in the image
- Consider typical sizes of identified waste items
- Estimate physical dimensions based on common object sizes
- Provide a confidence level for your volume estimation
- Explain your estimation method briefly

Be precise and provide actionable information for waste management.`
              },
              {
                type: 'image_url',
                image_url: { 
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.3 // Lower temperature for more consistent JSON output
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        console.error('Payment required - out of credits');
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI classification failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');
    
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Invalid AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from AI
    let classification;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : aiResponse;
      classification = JSON.parse(jsonStr);
      console.log('Classification result:', classification);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse classification results',
          rawResponse: aiResponse 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate classification result
    const validWasteTypes = ['plastic', 'metal', 'organic', 'glass', 'paper', 'electronic', 'textile', 'mixed', 'other'];
    if (!validWasteTypes.includes(classification.wasteType)) {
      console.error('Invalid waste type:', classification.wasteType);
      classification.wasteType = 'other';
    }

    // Ensure confidence is between 0 and 1
    if (typeof classification.confidence !== 'number' || classification.confidence < 0 || classification.confidence > 1) {
      classification.confidence = 0.5;
    }

    return new Response(
      JSON.stringify(classification),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in classify-waste function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
