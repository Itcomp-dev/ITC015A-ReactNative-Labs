export interface Book {
    id: number;
    title: string;
    thumbnailUrl: string;
    authors: string[];
    categories: string[];
    shortDescription: string;
    longDescription: string;
    pageCount: number;
    isbn: string;
    publishedDate: string | Date;
} 

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
}