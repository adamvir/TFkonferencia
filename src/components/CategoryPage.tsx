import { NewsCard, Article } from "./NewsCard";

interface CategoryPageProps {
  category: string;
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

export function CategoryPage({ category, articles, onArticleSelect }: CategoryPageProps) {
  const getCategoryTitle = (cat: string) => {
    const categoryMap: { [key: string]: string } = {
      "tőzsde": "Tőzsde",
      "kripto": "Kriptovaluták", 
      "fintech": "Fintech",
      "esg": "ESG",
      "makrogazdaság": "Makrogazdaság",
      "szabályozás": "Szabályozás",
      "venture capital": "Venture Capital",
      "deviza": "Deviza",
      "ingatlan": "Ingatlan",
      "biztosítás": "Biztosítás",
      "technológia": "Technológia"
    };
    return categoryMap[cat.toLowerCase()] || cat;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-4">{getCategoryTitle(category)}</h1>
        <p className="text-muted-foreground">
          A legfrissebb hírek és elemzések a {getCategoryTitle(category).toLowerCase()} területről
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onSelect={onArticleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Jelenleg nincsenek cikkek ebben a kategóriában.
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="bg-muted p-8 rounded-lg mt-16">
        <div className="text-center space-y-4">
          <h3 className="text-xl">Ne maradjon le semmiről!</h3>
          <p className="text-muted-foreground">
            Iratkozzon fel hírlevelünkre és értesüljön elsőként a {getCategoryTitle(category).toLowerCase()} terület legfontosabb eseményeiről
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
  );
}