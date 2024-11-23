import { useState } from "react";
import {
  Button,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";

const App = () => {
  const [alignment, setAlignment] = useState(null); // Jinsni tanlash uchun
  const [height, setHeight] = useState(170); // Bo'y qiymati
  const [weight, setWeight] = useState(70); // Vazn qiymati
  const [result, setResult] = useState(null); // BMI natijasi
  const [open, setOpen] = useState(false); // Modalni boshqarish uchun
  const [theme, setTheme] = useState("dark"); // Rejim boshqaruvi

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const color = alignment === "female" ? "secondary" : "primary";

  // Modalni ochish va natijani hisoblash
  const handleCalculate = () => {
    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    setResult(bmi);
    setOpen(true);
  };

  // Modalni yopish funksiyasi
  const handleClose = () => setOpen(false);

  // Rejimni o'zgartirish funksiyasi
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Dinamik sinflar
  const bgClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const cardClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const icon = theme === "dark" ? <FaSun /> : <FaMoon />;

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center ${bgClass} p-5`}
    >
      <div className={`w-full max-w-xl rounded-lg ${cardClass} p-6 shadow-lg`}>
        <button
          className={`absolute right-5 top-5 rounded-lg ${cardClass} p-3 shadow-lg`}
          onClick={toggleTheme}
        >
          {icon}
        </button>
        <section>
          <h1 className="text-n">BMI kalkulyatori</h1>
        </section>
        <section className="mb-6 text-center">
          <p className="text-t">Jinsingiz</p>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            className="flex w-full"
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="female" className="button-g" color="secondary">
              <span className="text-g text-[#9c27b0]">Ayol</span>
              <IoMdFemale className="button-i text-[#9c27b0]" />
            </ToggleButton>
            <ToggleButton value="male" className="button-g" color="primary">
              <span className="text-g text-[#42a5f5]">Erkak</span>
              <IoMdMale className="button-i text-[#42a5f5]" />
            </ToggleButton>
          </ToggleButtonGroup>
        </section>
        {alignment && (
          <section className="mb-6 text-center">
            <p className="text-t">Bo'yingiz (cm)</p>
            <p className="text-c">{height}</p>
            <Slider
              defaultValue={170}
              min={50}
              max={220}
              value={height}
              onChange={(e, val) => setHeight(val)}
              valueLabelDisplay="auto"
              color={color}
            />
            <p className="text-t">Vazningiz (kg)</p>
            <p className="text-c">{weight}</p>
            <Slider
              defaultValue={70}
              min={40}
              max={200}
              value={weight}
              onChange={(e, val) => setWeight(val)}
              valueLabelDisplay="auto"
              color={color}
            />
          </section>
        )}
        {alignment && (
          <section>
            <Button
              variant="contained"
              className="w-full"
              onClick={handleCalculate}
              color={color}
            >
              <p className="button">Hisoblash</p>
            </Button>
          </section>
        )}
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className={`absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-lg ${cardClass} p-6 shadow-lg`}
        >
          <h1 className="text-n">Natija</h1>
          <h1 className="text-t">{result}</h1>
          <Button
            variant="contained"
            className="w-full"
            onClick={handleClose}
            color={color}
          >
            Yopish
          </Button>
        </Box>
      </Modal>
    </main>
  );
};

export default App;
