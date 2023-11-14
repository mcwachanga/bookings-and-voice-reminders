"use client";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";

interface AppointmentProps {
  data: any[];
}
function AppointmentsTable(props: AppointmentProps) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());

  const handleDateChange = (e: any) => {
    setCurrentDate(e.toString());
  };

  console.log(props.data);

  return (
    <>
      <div className="flex flex-col mt-5 bg-white rounded-lg shadow mx-auto">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Reason
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Reminded
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {appointment.customer}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.phone}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.bookedOn.toString()}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.reason}</td>
                      <td className="whitespace-nowrap px-6 py-4">{appointment.reminded ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentsTable;
