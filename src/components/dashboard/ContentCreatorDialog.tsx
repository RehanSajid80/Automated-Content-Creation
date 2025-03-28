
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel 
} from "@/components/ui/form";
import { FileText, Building2, Tag, Share2, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ContentCreatorDialogProps {
  onClose: () => void;
}

// Mock author personas
const authorPersonas = [
  { id: "emma", name: "Emma Roberts", role: "Workplace Strategy Director", style: "Authoritative and detailed with research focus" },
  { id: "david", name: "David Chen", role: "Facility Management Specialist", style: "Practical with actionable advice" },
  { id: "sarah", name: "Sarah Johnson", role: "Office Space Consultant", style: "Conversational and relatable, focuses on user experience" },
  { id: "michael", name: "Michael Williams", role: "Technology Integration Expert", style: "Technical but accessible, innovation-focused" }
];

// Content type descriptions with icons
const contentTypes = [
  { id: "pillar", name: "Pillar Content", icon: <FileText size={16} />, description: "Comprehensive guides on workplace management and space optimization" },
  { id: "support", name: "Support Pages", icon: <Building2 size={16} />, description: "Helpful documentation for software features and implementation guides" },
  { id: "meta", name: "Meta Tags", icon: <Tag size={16} />, description: "SEO-optimized titles and descriptions for office space software" },
  { id: "social", name: "Social Posts", icon: <Share2 size={16} />, description: "LinkedIn and Twitter content for office space software" },
];

const ContentCreatorDialog: React.FC<ContentCreatorDialogProps> = ({ onClose }) => {
  const [contentType, setContentType] = useState("pillar");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      keywords: "",
      author: "emma",
      context: "",
    }
  });
  
  const onSubmit = (data: any) => {
    setIsGenerating(true);
    setGeneratedContent("");
    
    // Simulate API call delay
    setTimeout(() => {
      const selectedAuthor = authorPersonas.find(a => a.id === data.author);
      const selectedType = contentTypes.find(t => t.id === contentType);
      
      // Create mock generated content based on inputs
      let content = "";
      if (contentType === "pillar") {
        content = `# The Complete Guide to ${data.keywords}\n\n## Introduction\nOptimizing office space is critical for modern businesses looking to maximize productivity...\n\n## Key Benefits\n1. Improved space utilization\n2. Enhanced employee satisfaction\n3. Reduced operational costs\n\n## Best Practices\nImplementing effective workspace management requires a strategic approach...`;
      } else if (contentType === "support") {
        content = `# How to Use Our ${data.keywords} Features\n\n## Getting Started\n1. Set up your floor plans\n2. Import employee data\n3. Configure booking rules\n\n## Troubleshooting\nIf you encounter issues with reservations...`;
      } else if (contentType === "meta") {
        content = `Title: Ultimate ${data.keywords} Guide: Optimize Your Workplace in 2024\n\nMeta Description: Discover how our ${data.keywords} solutions can transform your workplace management. Learn about key features, ROI, and implementation strategies.`;
      } else {
        content = `LinkedIn:\n🏢 Struggling with office space efficiency? Our ${data.keywords} just analyzed data from 1000+ companies. Here's what works:\n\n✅ Flexible seating arrangements\n✅ Data-driven space allocation\n✅ Integrated booking systems\n\nLearn more: [link]`;
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated",
        description: `${selectedType?.name} content has been created successfully.`,
      });
    }, 1500);
  };
  
  const handleSave = () => {
    toast({
      title: "Content Saved",
      description: "Your content has been saved to your library.",
    });
    onClose();
  };

  return (
    <div className="py-4">
      <Tabs value={contentType} onValueChange={setContentType} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          {contentTypes.map(type => (
            <TabsTrigger 
              key={type.id} 
              value={type.id}
              className="flex items-center gap-1.5"
            >
              {type.icon}
              <span>{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {contentTypes.find(t => t.id === contentType)?.description}
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., desk booking system, workplace management" {...field} />
                  </FormControl>
                  <FormDescription>Enter primary keywords separated by commas</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Persona</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authorPersonas.map(author => (
                        <SelectItem key={author.id} value={author.id}>
                          <div className="flex flex-col">
                            <span>{author.name}</span>
                            <span className="text-xs text-muted-foreground">{author.style}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The author persona will influence content style and tone
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Context</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide context about your target audience, purpose of the content, and any specific points to include..." 
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate {contentTypes.find(t => t.id === contentType)?.name}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {generatedContent && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Generated Content</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(generatedContent);
                  toast({
                    title: "Copied",
                    description: "Content copied to clipboard",
                  });
                }}>
                  Copy
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save <Check size={14} className="ml-1.5" />
                </Button>
              </div>
            </div>
            <Textarea 
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default ContentCreatorDialog;
