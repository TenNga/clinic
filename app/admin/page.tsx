import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { columns, Payment } from '@/components/table/columns'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const Admin = async () => {

  const data = await getData()

  const appointments = await getRecentAppointmentList();

  // {
  //   totalcount: 2,
  //   scheduledCount: 0,
  //   pendingCount: 2,
  //   cancelledCount: 0,
  //   documents: [
  //     {
  //       schedule: '2024-10-25T22:00:00.000+00:00',
  //       reason: 'tsttesdf',
  //       note: '',
  //       primaryPhysician: 'Leila Cameron',
  //       status: 'pending',
  //       userId: '670c746f003a479afeb9',
  //       cancellationReason: null,
  //       '$id': '67157e55003ad323e1a1',
  //       '$createdAt': '2024-10-20T22:04:07.277+00:00',
  //       '$updatedAt': '2024-10-20T22:04:07.277+00:00',
  //       '$permissions': [],
  //       patient: [Object],
  //       '$databaseId': '670c656900248198ac6f',
  //       '$collectionId': '670c65c70038c82f6c44'
  //     },
  //     {
  //       schedule: '2024-11-01T02:00:00.000+00:00',
  //       reason: 'annual checkup',
  //       note: '',
  //       primaryPhysician: 'Jane Powell',
  //       status: 'pending',
  //       userId: '670c746f003a479afeb9',
  //       cancellationReason: null,
  //       '$id': '67145e39001cbccec86d',
  //       '$createdAt': '2024-10-20T01:34:50.342+00:00',
  //       '$updatedAt': '2024-10-20T01:34:50.342+00:00',
  //       '$permissions': [],
  //       patient: [Object],
  //       '$databaseId': '670c656900248198ac6f',
  //       '$collectionId': '670c65c70038c82f6c44'
  //     }
  //   ]
  // }

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/" className='cursor-pointer'>
          <Image 
            src="/assets/icons/logo-full.svg"
            width={162}
            height={32}
            alt='logo'
            className='h-8 w-fit'
          />
        </Link>

        <p className='text-16-semibold'> Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome</h1>
          <p className='text-dark-700'>Start day with managing new appointment.</p>
        </section>

        <section className='admin-stat'>
          <StatCard 
            type="appointments"
            count={appointments.scheduleCount}
            label="scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard 
            type="pending"
            count={appointments.pendingCount}
            label="pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard 
            type="cancelled"
            count={appointments.cancelledCount}
            label="cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />

      </main>
    </div>
  )
}

export default Admin