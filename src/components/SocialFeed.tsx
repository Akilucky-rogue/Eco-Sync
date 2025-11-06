import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Camera, Trophy } from "lucide-react";
import TeamCard from "./TeamCard";
import PhotoShareCard from "./PhotoShareCard";
import PageLoader from "./PageLoader";
import ErrorMessage from "./ErrorMessage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SocialFeed = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [socialPosts, setSocialPosts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  // Realtime subscriptions
  useEffect(() => {
    if (!user) return;

    const teamsChannel = supabase
      .channel('teams-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'teams'
        },
        () => loadTeams()
      )
      .subscribe();

    const postsChannel = supabase
      .channel('social-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'social_posts'
        },
        () => loadSocialPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(teamsChannel);
      supabase.removeChannel(postsChannel);
    };
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([loadTeams(), loadSocialPosts()]);
    } catch (error: any) {
      console.error('Error loading social feed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(user_id, role, joined_at)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setTeams(data?.map(team => ({
        id: team.id,
        name: team.name,
        description: team.description,
        members: team.team_members?.map((m: any) => ({
          id: m.user_id,
          name: 'Member', // Would need to join with profiles
          role: m.role,
          joinedAt: new Date(m.joined_at).toLocaleDateString()
        })) || [],
        location: 'Unknown',
        nextEvent: 'TBD',
        isPublic: true,
        maxMembers: 20
      })) || []);
    } catch (error: any) {
      console.error('Error loading teams:', error);
    }
  };

  const loadSocialPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setSocialPosts(data?.filter(post => post.type === 'photo').map(post => ({
        id: post.id,
        user: { name: 'User', avatar: '' }, // Would need to join with profiles
        image: post.image_url || '/placeholder.svg',
        caption: post.content,
        location: post.location || 'Unknown',
        eventName: 'Event',
        timestamp: new Date(post.created_at).toLocaleDateString(),
        likes: post.likes,
        comments: 0,
        tags: [],
        isLiked: false
      })) || []);
    } catch (error: any) {
      console.error('Error loading social posts:', error);
    }
  };

  const handleJoinTeam = async (teamId: string) => {
    if (!user) return;

    try {
      await supabase.from('team_members').insert({
        team_id: teamId,
        user_id: user.id,
        role: 'member'
      });
      loadTeams();
    } catch (error) {
      console.error('Error joining team:', error);
    }
  };

  const handleViewTeam = (teamId: string) => {
    console.log("Viewing team:", teamId);
  };

  const handleLikePhoto = async (photoId: string) => {
    try {
      const post = socialPosts.find(p => p.id === photoId);
      if (post) {
        await supabase
          .from('social_posts')
          .update({ likes: post.likes + 1 })
          .eq('id', photoId);
        loadSocialPosts();
      }
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleCommentPhoto = (photoId: string) => {
    console.log("Commenting on photo:", photoId);
  };

  const handleSharePhoto = (photoId: string) => {
    console.log("Sharing photo:", photoId);
  };

  if (loading) {
    return <PageLoader text="Loading community feed..." />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load feed" message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search teams, people, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-[#FF6F61] hover:bg-[#FF6F61]/90">
          <Camera className="h-4 w-4 mr-2" />
          Share Photo
        </Button>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-xl border-0 p-1 h-14">
          <TabsTrigger 
            value="teams" 
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#014F86] data-[state=active]:to-[#0066A3] data-[state=active]:text-white"
          >
            <Users className="h-5 w-5 mr-2" />
            Teams
          </TabsTrigger>
          <TabsTrigger 
            value="photos"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6F61] data-[state=active]:to-[#E55B50] data-[state=active]:text-white"
          >
            <Camera className="h-5 w-5 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger 
            value="achievements"
            className="rounded-lg text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C5E4CF] data-[state=active]:to-[#F6EFD2] data-[state=active]:text-[#014F86]"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Highlights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {teams.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No teams yet</h3>
              <p className="text-gray-500">Be the first to create a team!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onJoin={handleJoinTeam}
                  onView={handleViewTeam}
                  isUserMember={false}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          {socialPosts.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos yet</h3>
              <p className="text-gray-500">Share your cleanup photos with the community!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialPosts.map((photo) => (
                <PhotoShareCard
                  key={photo.id}
                  photo={photo}
                  onLike={handleLikePhoto}
                  onComment={handleCommentPhoto}
                  onShare={handleSharePhoto}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-[#FF6F61] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#014F86] mb-2">Community Highlights</h3>
            <p className="text-gray-600">Recent achievements and milestones from our community will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialFeed;
