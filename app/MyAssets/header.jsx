export default function Header() {
   const handlePrevMonth = () => {
      setCurrentDate(prev => subMonths(prev, 1));
   }
   const handleNextMonth = () => {
      setCurrentDate(prev => addMonths(prev, 1));
   }
   const formattedDate=`${current}`
   return (
      <>
         <div style={{height:"50px"}}>
            <button>
               <img src="/images/search.svg" alt="search" />
            </button>

            <span>가계부</span>
            
            <button>
               <img src="/images/favorite.svg" />
            </button>
            <button>
               <img src="/images/filter.svg" />
            </button>
         </div>
         <div>
            <button onClick={handlePrevMonth}>
               <img src="/images/arrow-back.svg" />
            </button>
            <span>{formattedDate}</span>
            <button onClick={handleNextMonth}>
               <img src="/images/arrow-next.svg" />
            </button>
         </div>

      </>
   )
}