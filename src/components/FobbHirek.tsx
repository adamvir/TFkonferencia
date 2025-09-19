import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Article } from "./NewsCard";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, User, TrendingUp } from "lucide-react";

interface FobbHirekProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

export function FobbHirek({ articles, onArticleSelect }: FobbHirekProps) {
  const topArticles = articles.slice(0, 6);

  // Kategóriánkénti színek
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'tőzsde': 'bg-blue-600',
      'kripto': 'bg-orange-600', 
      'fintech': 'bg-purple-600',
      'esg': 'bg-green-600',
      'makrogazdaság': 'bg-red-600',
      'szabályozás': 'bg-indigo-600',
      'venture capital': 'bg-pink-600',
      'deviza': 'bg-yellow-600',
      'ingatlan': 'bg-emerald-600',
      'biztosítás': 'bg-teal-600',
      'technológia': 'bg-cyan-600'
    };
    return colors[category.toLowerCase()] || 'bg-gray-600';
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl text-foreground">Főbb hírek</h2>
        <div className="h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800 flex-1"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fő kiemelt cikk - keskenyebb */}
        {topArticles[0] && (
          <Card 
            className="lg:col-span-6 h-96 cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden group relative border-0"
            onClick={() => onArticleSelect(topArticles[0])}
          >
            <div className="relative h-full">
              <ImageWithFallback
                src={topArticles[0].imageUrl}
                alt={topArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge className={`mb-3 ${getCategoryColor(topArticles[0].category)} text-white text-sm px-3 py-1 shadow-lg`}>
                  {topArticles[0].category}
                </Badge>
                <h3 className="text-2xl mb-3 line-clamp-3 group-hover:text-yellow-300 transition-colors duration-300 font-semibold">
                  {topArticles[0].title}
                </h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {topArticles[0].excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{topArticles[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{topArticles[0].publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 border-4 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </Card>
        )}

        {/* Jobb oldali cikkek - nagyobbak */}
        <div className="lg:col-span-6 space-y-4">
          {topArticles.slice(1, 3).map((article, index) => (
            <Card 
              key={article.id}
              className="h-48 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              onClick={() => onArticleSelect(article)}
            >
              <div className="relative h-full">
                <ImageWithFallback
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <Badge className={`text-xs mb-2 ${getCategoryColor(article.category)} text-white px-2 py-1`}>
                    {article.category}
                  </Badge>
                  <h4 className="line-clamp-2 text-base mb-2 group-hover:text-yellow-300 transition-colors duration-300 leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-white/70">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Alsó három cikk - nagyobb grid */}
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topArticles.slice(3, 6).map((article, index) => (
              <Card 
                key={article.id}
                className="h-72 cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                onClick={() => onArticleSelect(article)}
              >
                <div className="relative h-full">
                  <ImageWithFallback
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/70 transition-all duration-300" />
                  
                  {/* BREAKING badge csak */}
                  {index === 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-600 text-white text-xs px-3 py-1 shadow-lg">
                        BREAKING
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <Badge className={`text-xs mb-2 ${getCategoryColor(article.category)} text-white px-2 py-1`}>
                      {article.category}
                    </Badge>
                    <h4 className="line-clamp-2 mb-3 group-hover:text-yellow-300 transition-colors duration-300 text-base leading-snug">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-white/70">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Modern hover effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300 pointer-events-none"></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-700"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-blue-800 mt-8"></div>
    </section>
  );
}