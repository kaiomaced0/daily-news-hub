import React from "react";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import NewsCard from "../components/NewsCard";
import DateFilter from "../components/DateFilter";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Tecnologia",
  "Brasil",
  "Culinária",
  "Política",
  "Cinema",
  "Esportes",
  "Ciência",
  "Economia",
];

const API_KEY = "10afe1bd055f4c07b8e7b07beb51b5a1";

interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Tecnologia");
  const [fromDate, setFromDate] = React.useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 4);
    return date;
  });

  const fetchNews = async () => {
    const query = searchQuery || selectedCategory;
    const from = fromDate.toISOString().split("T")[0];
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=publishedAt&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (response.status === 426) {
      toast({
        title: "API Limitation",
        description: "This API only works on localhost in development mode. Please run the app locally.",
        variant: "destructive",
      });
      throw new Error("API only works on localhost in development mode");
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }
    
    return data.articles;
  };

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ["news", searchQuery, selectedCategory, fromDate],
    queryFn: fetchNews,
    staleTime: 4 * 60 * 60 * 1000, // 4 hours
    gcTime: 4 * 60 * 60 * 1000, // 4 hours
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">News Explorer</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <DateFilter date={fromDate} onDateChange={setFromDate} />
        </div>

        <CategoryPills
          categories={CATEGORIES}
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load news. Please try again later.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles?.map((article: NewsArticle, index: number) => (
            <NewsCard
              key={`${article.url}-${index}`}
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              url={article.url}
              source={article.source.name}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;