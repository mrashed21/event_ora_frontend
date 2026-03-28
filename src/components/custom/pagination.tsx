import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  limitOptions?: number[];
}

const Pagination = ({
  page,
  limit,
  total,
  setPage,
  setLimit,
  limitOptions = [10, 20, 50, 100],
}: PaginationProps) => {
  console.log("page: ", page, "limit : ", limit, "total: ", total);
  const totalPage = Math.ceil(total / limit);

  if (totalPage <= 1) return null;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPage) return;
    setPage(p);
  };

  const renderPages = () => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPage, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages.map((p) => (
      <button
        key={p}
        onClick={() => goToPage(p)}
        className={`px-3 py-1 rounded-md text-sm border transition
          ${
            p === page
              ? "bg-primary text-white border-primary"
              : "hover:bg-muted"
          }`}
      >
        {p}
      </button>
    ));
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left info */}
      <p className="text-sm text-muted-foreground">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
        {total}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {renderPages()}

        {/* Next */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPage}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </button>

        {/* Limit */}
        <select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(Number(e.target.value));
          }}
          className="ml-3 border rounded-md px-2 py-1 text-sm"
        >
          {limitOptions.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
