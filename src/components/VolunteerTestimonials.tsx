
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  message: string;
  eventsAttended: number;
  dateJoined: string;
}

const VolunteerTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Arjun Mehta",
      location: "Mumbai, Maharashtra",
      avatar: "👨‍💼",
      rating: 5,
      message: "EcoSync has transformed how I contribute to marine conservation. The community is amazing and every cleanup feels meaningful!",
      eventsAttended: 15,
      dateJoined: "March 2024"
    },
    {
      id: 2,
      name: "Kavya Nair",
      location: "Kochi, Kerala",
      avatar: "👩‍🎓",
      rating: 5,
      message: "I love how organized and impactful these cleanups are. Seeing the immediate difference we make to our coastline is incredibly rewarding.",
      eventsAttended: 12,
      dateJoined: "January 2024"
    },
    {
      id: 3,
      name: "Rohan Das",
      location: "Goa",
      avatar: "👨‍🔬",
      rating: 5,
      message: "The gamification aspect keeps me motivated! Earning points and badges while protecting our environment is brilliant.",
      eventsAttended: 20,
      dateJoined: "February 2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="shadow-xl border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2] p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#014F86]/10 rounded-lg">
            <Quote className="h-6 w-6 text-[#014F86]" />
          </div>
          <h3 className="text-2xl font-bold text-[#014F86]">Volunteer Stories</h3>
          <Badge className="bg-[#FF6F61] text-white">Real Impact</Badge>
        </div>
        <p className="text-gray-600">Hear from our community of marine conservation heroes</p>
      </div>

      <CardContent className="p-6">
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-[#014F86] text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-[#FF6F61]/20" />
                    <p className="text-gray-700 italic pl-4 leading-relaxed">
                      "{testimonial.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-blue-700">
                        {testimonial.eventsAttended} events
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-green-700">
                        Since {testimonial.dateJoined}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
          <p className="text-[#014F86] font-medium mb-2">Ready to make your impact?</p>
          <p className="text-sm text-gray-600">
            Join thousands of volunteers making a difference in marine conservation across India
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolunteerTestimonials;
