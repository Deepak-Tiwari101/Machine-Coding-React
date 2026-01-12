import React, {useState, useEffect} from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-400 border-t-green-600" />
    </div>

  )
}

export default function App() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // get initial data
  useEffect(() => {
    loadMore();
    setPage((page) => page+1);
    // setIsLoading(false)
  }, []);

  useEffect(() => {
    // Scroll Listner
    const handleScroll = () => {
      if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 20)
          && hasMore && !isLoading) {
            loadMore();
          }
    };
    window.addEventListener('scroll', handleScroll);
    return (() => window.removeEventListener('scroll', handleScroll));
  }, [hasMore, isLoading])

  const loadMore = async () => {
    // for already isLoading state or no more content to fetch just return out of the function
    if(isLoading || !hasMore) return;

    setIsLoading(true);

    const res = await fetchData(page);

    setItems((prev) => [...prev, ...res.data]);
    setPage(page => page + 1);
    setHasMore(res.hasMore);

    setIsLoading(false);
  }

  const fetchData = async (pageNum) => {
    // simulate artificial lag like scenario during fetch (1000 - 1999 ms lag)
    console.log(pageNum)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.floor(Math.random() * 1000)));

    const newItem = Array.from({length: 10}, (_, i) => ({
      id: (pageNum-1)*10 + i + 1,
      title: `Item ${(pageNum-1)*10 + i + 1}`
    }));

    return {
      data: newItem,
      hasMore: pageNum < 8
    };
  }

  return (
    <div className="relative m-4 p-2 bg-zinc-800/80 backdrop-blur-2xl rounded-xl border border-zinc-700">
      <div className="absolute w-64 h-64 bg-green-600/20 -top-20 left-1/2
      -translate-x-1/2 rounded-full blur-3xl">

      </div>
      <div className="flex flex-col gap-5 items-center justify-center">
        {items.length === 0 && <h1>Loading...</h1>}
        {items?.map((item) => (
          <div key={item.id} className="w-full text-center rounded-xl border border-zinc-700 p-4">
            {item.title}
          </div>
        ))}

        {isLoading && <Loading />}
      </div>
    </div>
  )  
}
