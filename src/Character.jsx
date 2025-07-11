
function App({name, origin, status, imgSrc}) {
  
  return (
    <>
      
          <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <li>
              <div class="flex items-center gap-x-6">
                <img class="size-16 rounded-full" src={imgSrc} alt={name} />
                <div>
                  <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">{name}</h3>
                  <p class="text-sm/6 font-semibold text-indigo-600">{status} / {origin}</p>
                </div>
              </div>
            </li>
          </ul>
      

    </>
  )
}

export default App
