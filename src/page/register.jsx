import { useState } from "react";
// import "./register.css"
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    email: "",
    password: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        style={{ marginTop: "50px", padding: "20px" }}
      >
        <div className="text-center mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/552/683/non_2x/geo-location-pin-vector-icon.jpg"
            alt="Logo"
            className="mx-auto mb-4"
            style={{ height: "60px" }}
          />
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>
        <div style={{ marginTop: "30px" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-mono"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700 font-mono">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-mono">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-mono"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-mono">
                Date of Birth:
              </label>
              <div className="flex space-x-2">
                <select
                  id="birthMonth"
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                  required
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  id="birthDay"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                  required
                >
                  <option value="" disabled>
                    Day
                  </option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  id="birthYear"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full rounded text-gray-700 placeholder-gray-500 focus:outline-none bg-gray-100 hover:border-yellow-400"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">
              By tapping <strong>“Sign up and accept”</strong>, you acknowledge
              that you have read the{" "}
              <a
                href="#privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and agree to the{" "}
              <a
                href="#terms-of-service"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </a>
              . Snapchatters can always capture or save your messages, such as
              by taking a screenshot or using a camera. Be mindful of what you
              Snap!
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
