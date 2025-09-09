import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Zap,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function SkillsMapping({ skillMappings, isLoading }) {
  const getSimilarityIcon = (level) => {
    switch (level) {
      case 'direct':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'similar':
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case 'different':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'new_concept':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSimilarityColor = (level) => {
    switch (level) {
      case 'direct':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'similar':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'different':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'new_concept':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-3 p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Skills Transition Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skillMappings.map((mapping) => (
            <div key={mapping.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                {getSimilarityIcon(mapping.similarity_level)}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {mapping.salesforce_skill}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {mapping.servicenow_equivalent}
                    </span>
                  </div>
                </div>
              </div>

              <Badge 
                variant="secondary" 
                className={`text-xs ${getSimilarityColor(mapping.similarity_level)}`}
              >
                {mapping.similarity_level.replace('_', ' ')}
              </Badge>

              {mapping.transition_notes && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {mapping.transition_notes}
                </p>
              )}
            </div>
          ))}

          <div className="text-center pt-4">
            <Link to={createPageUrl("SkillsMap")}>
              <Button variant="ghost" size="sm" className="gap-2">
                View Complete Skills Map
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}