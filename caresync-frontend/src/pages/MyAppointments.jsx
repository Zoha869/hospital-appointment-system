import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  const patient =
    JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    try {

      const res =
        await API.get("/appointments/my");

      setAppointments(res.data);

    } catch (err) {

      console.log("Error fetching appointments");

    }

  };

  return (

    <div className="dashboard-container">

      <Sidebar patient={patient} />

      <div className="dashboard-main">

        <Navbar patient={patient} />

        <h2>My Appointments</h2>

        {appointments.length > 0 ? (

          appointments.map((appt) => (

            <div
              key={appt._id}
              className="appointment-list"
            >

              <img
                src="https://i.pravatar.cc/50"
                alt=""
              />

              <div>

                <h3>
                  Dr. {appt.doctor.name}
                </h3>

                <p>
                  Date:
                  {" "}
                  {new Date(
                    appt.date
                  ).toDateString()}
                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-card">
            No appointments found
          </div>

        )}

      </div>

    </div>

  );

}