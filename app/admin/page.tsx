import { Metadata } from 'next'
import DashboardStats from './components/DashboardStats'
import ConsultationsList from './components/ConsultationsList'
import PodcastManager from './components/PodcastManager'
import BlogManager from './components/BlogManager'
import ResourceManager from './components/ResourceManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Administration | Mildy Consulting RH',
  description: 'Interface d\'administration',
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Administration</h1>
      
      <Tabs defaultValue="consultations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>

        <TabsContent value="consultations">
          <DashboardStats />
          <ConsultationsList />
        </TabsContent>

        <TabsContent value="podcasts">
          <PodcastManager />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>

        <TabsContent value="resources">
          <ResourceManager />
        </TabsContent>
      </Tabs>
    </div>
  )
} 