const HomeFeature = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className=" px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <aside
            aria-label="Related articles"
            className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
          >
            <div className="mx-auto max-w-screen-xl">
              <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Featured Destinations
              </h1>
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <article className="max-w-xs">
                  <a href="#">
                    <img
                      src="/chitwan.jpg"
                      className="mb-5 rounded-lg"
                      alt="Image 1"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">Our first office</a>
                  </h2>
                  
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 2 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <img
                      src="/swayambhu.jpg"
                      className="mb-5 rounded-lg"
                      alt="Image 2"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">Enterprise design tips</a>
                  </h2>
                  
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 12 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <img
                      src="banner.jpg"
                      className="mb-5 rounded-lg"
                      alt="Image 3"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">We partnered with Google</a>
                  </h2>
                 
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 8 minutes
                  </a>
                </article>
                <article className="max-w-xs">
                  <a href="#">
                    <img
                      src="boudha.jpg"
                      className="mb-5 rounded-lg"
                      alt="Image 4"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#">Our first project with React</a>
                  </h2>
                  
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 4 minutes
                  </a>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default HomeFeature;
