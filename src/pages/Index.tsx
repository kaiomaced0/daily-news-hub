import React from "react";
import SearchBar from "../components/SearchBar";
import CategoryPills from "../components/CategoryPills";
import NewsCard from "../components/NewsCard";
import DateFilter from "../components/DateFilter";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

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
const ITEMS_PER_PAGE = 9;

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Tecnologia");
  const [currentPage, setCurrentPage] = React.useState(1);
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
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = articles ? Math.ceil(articles.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentArticles = articles?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-primary">News Explorer</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Contato do Desenvolvedor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Informações de Contato</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <a 
                  href="https://instagram.com/kaiomacedo_m" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink size={16} />
                  Instagram: @kaiomacedo_m
                </a>
                <a 
                  href="https://github.com/kaiomaced0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink size={16} />
                  GitHub: kaiomaced0
                </a>
                <a 
                  href="mailto:kaiomm2000@gmail.com"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink size={16} />
                  Email: kaiomm2000@gmail.com
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
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
          {currentArticles?.map((article: any, index: number) => (
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

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }} 
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }} 
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
