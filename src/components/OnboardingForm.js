"use client"

import { useState, useEffect } from "react"
import Toast from "./Toast"
import "../styles/onboarding-form.css"

const interestOptions = ["Rapid Prototyping", "Production", "Swatching", "3D Sampling", "Knit Programming"]
const identityOptions = ["Brand", "Designer", "Buyer", "Factory", "Student"]

const OnboardingForm = ({ compact = false, userCity = "", userCountry = "", userCountryCode = "" }) => {
  const [form, setForm] = useState({
    name: "",
    interests: [],
    identity: "",
    email: "",
    message: "",
    userCity: "",
    userCountry: "",
    userCountryCode: "",
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  // Sync location props to form state
  useEffect(() => {
    if (userCity || userCountry || userCountryCode) {
      setForm((prev) => ({
        ...prev,
        userCity,
        userCountry,
        userCountryCode,
      }))
    }
  }, [userCity, userCountry, userCountryCode])

  const handleCheckboxChanges = (group, value) => {
    setForm((prev) => {
      const current = prev[group]
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [group]: updated }
    })
  }

  const handleRadioChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setToast(null)

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Failed to submit form")

      setToast({ message: "Thanks! We'll be in touch shortly.", type: "success" })

      setForm((prev) => ({
        name: "",
        interests: [],
        identity: "",
        email: "",
        message: "",
        userCity: prev.userCity,
        userCountry: prev.userCountry,
        userCountryCode: prev.userCountryCode,
      }))
    } catch (err) {
      console.error(err)
      setToast({ message: "Submission failed. Please try again.", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form className={`onboarding-form ${compact ? "chat-mode" : ""}`} onSubmit={handleSubmit}>
        <h2>Get Started with Maeknit</h2>

        <label>I am most interested in:</label>
        <div className="checkbox-group column">
          {interestOptions.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={form.interests.includes(item)}
                onChange={() => handleCheckboxChanges("interests", item)}
              />
              {item}
            </label>
          ))}
        </div>

        <label>I am a:</label>
        <div className="checkbox-group column">
          {identityOptions.map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="identity"
                value={item}
                checked={form.identity === item}
                onChange={() => handleRadioChange("identity", item)}
              />
              {item}
            </label>
          ))}
        </div>

        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Tell us more about yourself:</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={compact ? 3 : 5} />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  )
}

export default OnboardingForm