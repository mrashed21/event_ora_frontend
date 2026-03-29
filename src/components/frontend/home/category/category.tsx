"use client";

import {
  useHomeCategories,
  type HomeCategoryQueryParams,
} from "@/api/category/category.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useMemo, useState } from "react";

type FilterKey =
  | "public-free"
  | "public-paid"
  | "private-free"
  | "private-paid";

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: "public-free", label: "Public Free" },
  { key: "public-paid", label: "Public Paid" },
  { key: "private-free", label: "Private Free" },
  { key: "private-paid", label: "Private Paid" },
];

const Category = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("public-free");

  const queryParams = useMemo<HomeCategoryQueryParams>(() => {
    switch (activeFilter) {
      case "public-free":
        return {
          category_status: "active",
          category_type: "public",
          is_paid: false,
          page: 1,
          limit: 10,
        };

      case "public-paid":
        return {
          category_status: "active",
          category_type: "public",
          is_paid: true,
          page: 1,
          limit: 10,
        };

      case "private-free":
        return {
          category_status: "active",
          category_type: "private",
          is_paid: false,
          page: 1,
          limit: 10,
        };

      case "private-paid":
        return {
          category_status: "active",
          category_type: "private",
          is_paid: true,
          page: 1,
          limit: 10,
        };

      default:
        return {
          category_status: "active",
          page: 1,
          limit: 10,
        };
    }
  }, [activeFilter]);

  const { data: categoryData, isLoading } = useHomeCategories(queryParams);

  const categories = categoryData?.data?.data || [];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Event Categories
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Explore Event Categories
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Browse events by access type and pricing model to quickly find what
            fits your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.key;

            return (
              <Button
                key={filter.key}
                type="button"
                variant={isActive ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.key)}
                className="rounded-full px-5"
              >
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl">
                <div className="h-48 animate-pulse bg-muted" />
                <CardContent className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <Card className="rounded-3xl border-dashed">
            <CardContent className="py-16 text-center">
              <h3 className="text-xl font-semibold text-foreground">
                No categories found
              </h3>
              <p className="mt-2 text-muted-foreground">
                No categories available for this filter right now.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category: any) => (
              <Card
                key={category.id}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={category.category_image}
                    alt={category.category_title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full border bg-background/90 px-3 py-1 text-xs font-medium capitalize text-foreground backdrop-blur">
                      {category.category_type}
                    </span>

                    <span className="rounded-full border bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                      {category.is_paid ? "Paid" : "Free"}
                    </span>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="line-clamp-1 text-xl font-semibold text-foreground">
                    {category.category_title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {category.category_description}
                  </p>

                  <Button variant="link" className="mt-4 h-auto px-0">
                    Explore Category →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
