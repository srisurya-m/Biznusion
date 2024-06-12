import { ChangeEvent, ChangeEventHandler, FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScheduleCallFormData } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

const ScheduleCall = () => {
  const currentDate = new Date();
  const [formData, setFormData] = useState<ScheduleCallFormData>({
    name: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
  });
  const navigate = useNavigate();
  const [isDateSelected, setIsDateSelected] = useState(false); // Track if date is selected

  const generateTimeOptions = useMemo(() => {
    const options: any = [];
    const selectedDate = formData.preferredDate ? new Date(formData.preferredDate) : null;

    // Define fixed time slots
    const timeSlots = [
      { start: 8 },
      { start: 10 },
      { start: 12 },
      { start: 14 },
      { start: 16 },
      { start: 18 },
    ];

    if (selectedDate) {
      const currentTime = new Date();

      timeSlots.forEach(slot => {
        const slotStart = new Date(selectedDate);
        slotStart.setHours(slot.start, 0, 0, 0);

        // If the selected date is today, ensure the slot is not in the past
        if (selectedDate.toDateString() === currentTime.toDateString()) {
          if (slotStart > currentTime) {
            const formattedTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            options.push(
              <option key={formattedTime} value={formattedTime}>
                {formattedTime}
              </option>
            );
          }
        } else {
          const formattedTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          options.push(
            <option key={formattedTime} value={formattedTime}>
              {formattedTime}
            </option>
          );
        }
      });
    }

    return options;
  }, [formData.preferredDate, currentDate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'preferredDate') {
      setIsDateSelected(e.target.value !== ""); // Update date selection state
    }
  };

  const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFormData({
      ...formData,
      preferredTime: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, preferredDate, preferredTime } = formData;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/contact-us/appointment`,
        {
          name,
          email,
          preferredDate,
          preferredTime,
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        navigate("/");
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
  };

  return (
    <div className="schedule-call-container">
      <h1 className="schedule-call-title">Schedule a Call with Our Experts</h1>
      <form className="schedule-call-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="schedule-call-label" htmlFor="name">
            Name:
          </label>
          <input
            className="schedule-call-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="schedule-call-label" htmlFor="email">
            Email:
          </label>
          <input
            className="schedule-call-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="schedule-call-label" htmlFor="preferredDate">
            Preferred Date:
          </label>
          <input
            className="schedule-call-input"
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            min={currentDate.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="schedule-call-label" htmlFor="preferredTime">
            Preferred Time:
          </label>
          <select
            className="schedule-call-input"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleTimeChange}
            disabled={!isDateSelected} // Disable if no date selected
            required
          >
            <option value="">Select a time</option>
            {generateTimeOptions}
          </select>
        </div>
        <button type="submit" className="schedule-call-button">
          Schedule Call
        </button>
      </form>
    </div>
  );
};

export default ScheduleCall;
