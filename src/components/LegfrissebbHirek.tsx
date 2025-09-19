import { Article } from "./NewsCard";
import { Clock } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface LegfrissebbHirekProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

export function LegfrissebbHirek({ articles, onArticleSelect }: LegfrissebbHirekProps) {
  // Az első 5 cikket kihagyjuk (azok a főbb híreknél vannak), és a következő 20-at vesszük
  const latestArticles = articles.slice(5, 25);

  return (
    <div className="space-y-4">
      <h3 className="text-xl">Legfrissebb hírek</h3>
      <ScrollArea className="h-80">
        <div className="space-y-2 pr-3">
          {latestArticles.map((article, index) => (
            <div 
              key={article.id}
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group text-sm"
              onClick={() => onArticleSelect(article)}
            >
              <div className="flex-1 min-w-0">
                <h4 className="line-clamp-2 group-hover:text-primary transition-colors mb-1 text-sm">
                  {article.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs">
                    {article.category}
                  </span>
                  <span>{article.author}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground ml-3 flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span>{article.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}