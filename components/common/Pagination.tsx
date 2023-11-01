import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGINATION_RANGE } from "@/const/const";

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const { query } = useRouter();

  const currentPage = Number(query.page) ?? 1;

  return (
    <div>
      <ul className='flex flex-row gap-2'>
        <li>
          <PaginationItem to={currentPage - 1} value='&lt;' />
        </li>

        {Array.from(
          { length: PAGINATION_RANGE },
          (_, i) => currentPage - PAGINATION_RANGE + i + 2
        ).map((page) =>
          page > 0 && page <= totalPage ? (
            <PaginationItem
              key={page}
              to={page}
              value={page}
              active={page === currentPage}
            />
          ) : null
        )}
        <li>
          <PaginationItem to={currentPage + 1} value='&gt;' />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

interface PaginationItemProps {
  to: number;
  value: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const PaginationItem = ({
  to,
  value,
  disabled = false,
  active = false,
}: PaginationItemProps) => {
  return (
    <Link href={to.toString()}>
      <button className='' disabled={disabled}>
        {value}
      </button>
    </Link>
  );
};
