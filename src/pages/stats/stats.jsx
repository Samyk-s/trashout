const Stat = () => {
  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{
        background: "#360033",
        background: "-webkit-linear-gradient(to right, #0b8793, #360033)",
        background: "linear-gradient(to right, #0b8793, #360033)",
      }}
    >
      <section className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-white sm:grid-cols-3 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">73M+</dt>
              <dd className="font-light text-white dark:text-gray-400">
                developers
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1B+</dt>
              <dd className="font-light text-white dark:text-gray-400">
                contributors
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
              <dd className="font-light text-white dark:text-gray-400">
                organizations
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
};

export default Stat;
