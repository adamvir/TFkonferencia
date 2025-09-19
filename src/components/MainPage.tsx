import { NewsCard, Article } from "./NewsCard";
import { FobbHirek } from "./FobbHirek";
import { LegfrissebbHirek } from "./LegfrissebbHirek";
import { RovatCarousel } from "./RovatCarousel";
import { StockTicker } from "./StockTicker";

interface MainPageProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

export function MainPage({ articles, onArticleSelect }: MainPageProps) {
  const otherArticles = articles.slice(25); // A további hírek most a 25. cikktől kezdődnek
  
  // Tőzsde kategóriájú cikkek a carousel-hez
  const tozsdeCikkek = articles.filter(article => article.category === "Tőzsde").slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-16">
        {/* Breaking News Banner */}
        <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse w-2 h-2 bg-destructive-foreground rounded-full"></span>
            <span className="font-medium">Friss hírek</span>
          </div>
        </div>

        {/* Főbb hírek Section */}
        <FobbHirek articles={articles} onArticleSelect={onArticleSelect} />
      </div>

      {/* Stock Ticker */}
      <div className="mt-8">
        <StockTicker />
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Legfrissebb hírek és Rovatok Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bal oldal: Tőzsde rovat carousel */}
            <RovatCarousel 
              articles={tozsdeCikkek}
              rovatTitle="Tőzsde"
              onArticleSelect={onArticleSelect}
            />
            
            {/* Jobb oldal: Legfrissebb hírek lista */}
            <LegfrissebbHirek articles={articles} onArticleSelect={onArticleSelect} />
          </div>
        </section>

        {/* További hírek Grid */}
        {otherArticles.length > 0 && (
          <section>
            <h2 className="text-2xl mb-6">További hírek</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onSelect={onArticleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="bg-muted p-8 rounded-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl">Maradjon naprakész</h3>
            <p className="text-muted-foreground">
              Kapja meg a legfrissebb tőzsdei híreket minden reggel az e-mail címére
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-mail cím"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-md"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Feliratkozás
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}