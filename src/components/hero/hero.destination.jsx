const  HeroDestination = () => {    
    return (<>
    <section className="bg-white dark:bg-gray-900">
        
    <div className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src="/bannervid.mp4" type="video/mp4" />
      </video>
    </div>
    
</section>
    </>
    )
}
export default  HeroDestination;
