import React, { useState } from "react";
import { FileText, Tag, Share2, ArrowRight, Check, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContentGeneratorProps {
  className?: string;
}

// Mock content templates for Office Space Software
const contentTypes = [
  { 
    id: "pillar", 
    name: "Pillar Content", 
    icon: <FileText size={16} />,
    description: "Comprehensive guides on workplace management and space optimization",
    sample: "# The Complete Guide to Office Space Management\n\n## Introduction\nModern workplace management is evolving rapidly with new technologies leading the charge...\n\n## What is Office Space Management Software?\nOffice space management software enables businesses to efficiently organize, allocate, and optimize their physical workspaces..."
  },
  { 
    id: "support", 
    name: "Support Pages", 
    icon: <Building2 size={16} />,
    description: "Helpful documentation for software features, implementation guides, and FAQs",
    sample: "# How to Implement Desk Booking in Your Office\n\n## Getting Started\n1. Set up your floor plans in the admin portal\n2. Configure booking rules and restrictions\n3. Import employee data and departments\n4. Launch the booking system\n\n## Troubleshooting\nIf employees cannot see available desks..."
  },
  { 
    id: "meta", 
    name: "Meta Tags", 
    icon: <Tag size={16} />,
    description: "SEO-optimized title tags, meta descriptions, and headers for office software pages",
    sample: "Title: Office Space Management Software: Optimize Your Workplace in 2024\n\nMeta Description: Discover how our advanced office space management tools can transform your workplace efficiency. Our comprehensive solution covers desk booking, space analytics, and hybrid work management."
  },
  { 
    id: "social", 
    name: "Social Posts", 
    icon: <Share2 size={16} />,
    description: "Professional social media content for LinkedIn, Twitter, and other platforms",
    sample: "LinkedIn:\n📊 Are you getting the most out of your office space? Our latest workplace analytics report shows that companies are only utilizing 60% of their available space effectively.\n\n✅ Optimize desk allocation\n✅ Implement hoteling and hot-desking\n✅ Track space utilization metrics\n\nBook a demo today: [link]"
  },
];

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState("pillar");
  const [keywords, setKeywords] = useState("office space management, workplace optimization, desk booking system");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  
  // Mock content generation
  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedContent("");
    
    // Simulate API call delay
    setTimeout(() => {
      const selectedContentType = contentTypes.find(type => type.id === activeTab);
      setGeneratedContent(selectedContentType?.sample || "");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6 animate-slide-up animation-delay-400", className)}>
      <h3 className="text-lg font-semibold mb-6">Content Generator</h3>
      
      <Tabs defaultValue="pillar" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          {contentTypes.map(type => (
            <TabsTrigger 
              key={type.id} 
              value={type.id}
              className="flex items-center"
            >
              {type.icon}
              <span className="ml-2">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {contentTypes.map(type => (
          <TabsContent key={type.id} value={type.id} className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              {type.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="keywords" className="text-sm font-medium mb-1.5 block">
                  Target Keywords
                </label>
                <Textarea 
                  id="keywords"
                  placeholder="Enter keywords separated by commas"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="resize-none h-20"
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate {type.name} <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
              
              {generatedContent && activeTab === type.id && (
                <div className="rounded-lg border border-border p-4 mt-4 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium">Generated Content</div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="h-8 text-xs px-2">
                        Regenerate
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs px-2">
                        Copy
                      </Button>
                      <Button size="sm" className="h-8 text-xs px-2">
                        Save <Check size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="resize-none h-60 font-mono text-sm"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentGenerator;
