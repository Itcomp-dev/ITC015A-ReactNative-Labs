
import { HttpClient } from ".";

export function fetchBooks(skipCount=0, maxResultCount=10) { 
    return HttpClient.get("/api/books", {
        params: {skipCount, maxResultCount}
    })
}

export function insertBook(book) { 
    return HttpClient.post("/api/books",book)
}