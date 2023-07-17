import Page from '@/components/Page'
import { getLocations } from '@/lib/locations'
import Select from 'react-tailwindcss-select';
import { createLocationOptions } from '@/utils/validations';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  const locations = await getLocations()

  return {
    props: {
      locations,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  }
}

export default function Home({ locations }) {
  const [location, setLocation] = useState(null);
  const router = useRouter();

  const handleLocationsChange = (selectedOption) => {
    setLocation(selectedOption);
    console.log("location: ", selectedOption)
  }

  const locationOptions = createLocationOptions(locations);

  return (
    <Page title='Home'>
      <div className="flex flex-col items-center justify-center  py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 lg:px-20 text-center">
          <h1 className="text-6xl font-bold">
            Renta
          </h1>

          <p className="mt-3 text-2xl">
            Орендуй транспорт за кілька кліків
          </p>

          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-10">
            <h1 className="text-3xl font-bold">
              Де ви хочете орендувати?
            </h1>

            <div className="flex flex-row items-center justify-center w-full lg:w-72 mt-10 text-center w-">
              <Select
                className="w-5"
                options={locationOptions}
                value={location}
                onChange={handleLocationsChange}
                placeholder="Оберіть місто"
                primaryColor='yellow'
              />
            </div>


            <div className=" flex-row items-center justify-center w-full flex-1 mt-10 px-20 text-center">
              <button
                className="bg-black text-white p-3 rounded-md lg:w-1/2"
                onClick={() => {
                  console.log("location: ", location)
                  if (location) {
                    router.push(`/locations/${location.value}`)
                  }
                }
                }
              >
                Пошук
              </button>
            </div>
          </div>
        </main>
      </div>

    </Page>
  )
}
