
import { prisma } from '@/prisma/prisma-client'
import { TopBar,Container ,Title, Filters, ProductGroupList } from '@/shared/components/shared/index'
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas'

import React, { Suspense } from 'react'

export default async function Home({searchParams}: {searchParams: GetSearchParams}) {

  const categories = await findPizzas(searchParams)

    return (
        <>
          <Container className='mt-10'>
            <Title text='All Pizzas' size='lg' className='font-extrabold'/>
          </Container>
          <TopBar categories={categories.filter((category) => category.products.length > 0)}/>
          <Container className='mt-10 pb-14'>
            <div className="flex gap-[80px]">
              {/*FILTERS*/}
              <div className="w-[250px]">
                <Suspense>
                  <Filters/>
                </Suspense>
              </div>
              {/*PRODUCTS LIST*/}
              <div className="flex-1">
                <div className="flex flex-col gap-16">
                  {
                    categories.map((category) => (
                      category.products.length > 0 && (
                      <ProductGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                      )
                    ))
                  }
                </div>
              </div>
            </div>
          </Container>
        </>
    )
}