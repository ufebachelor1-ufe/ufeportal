import { useState } from "react";

export default function GpaCalculator() {
  const [scale, setScale] = useState("after2025"); 
  // "before2025" or "after2025"

  const scoreToGpa = (score) => {
    if (scale === "before2025") {
      if (score > 95) return 4.0;
      if (score > 89) return 3.7;
      if (score > 86) return 3.4;
      if (score > 82) return 3.0;
      if (score > 79) return 2.7;
      if (score > 76) return 2.3;
      if (score > 72) return 2.0;
      if (score > 69) return 1.7;
      if (score > 66) return 1.3;
      if (score > 62) return 1.0;
      if (score > 59) return 0.5;
      return 0.5;
    } else {
      if (score > 94) return 4.0;
      if (score > 89) return 3.7;
      if (score > 86) return 3.4;
      if (score > 82) return 3.0;
      if (score > 79) return 2.7;
      if (score > 76) return 2.3;
      if (score > 72) return 2.0;
      if (score > 69) return 1.7;
      if (score > 64) return 1.3;
      if (score > 59) return 1.0;
      return 0.5;
    }
  };

  const [semesters, setSemesters] = useState([
    { name: "Семестр 1", courses: [{ name: "", credits: 3, score: 100 }] },
  ]);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { name: `Семестр ${semesters.length + 1}`, courses: [] },
    ]);
  };

  const removeSemester = (index) => {
    setSemesters(semesters.filter((_, i) => i !== index));
  };

  const addCourse = (semesterIndex) => {
    const updated = [...semesters];
    updated[semesterIndex].courses.push({ name: "", credits: 3, score: 100 });
    setSemesters(updated);
  };

  const removeCourse = (semesterIndex, courseIndex) => {
    const updated = [...semesters];
    updated[semesterIndex].courses = updated[semesterIndex].courses.filter(
      (_, i) => i !== courseIndex
    );
    setSemesters(updated);
  };

  const updateCourse = (semesterIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semesterIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };

  const calculateSemesterGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(({ credits, score }) => {
      totalPoints += Number(credits) * scoreToGpa(Number(score));
      totalCredits += Number(credits);
    });

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  };

  const calculateCumulativeGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
      semester.courses.forEach(({ credits, score }) => {
        totalPoints += Number(credits) * scoreToGpa(Number(score));
        totalCredits += Number(credits);
      });
    });

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto">
      {/* Title */}
      <h1 className="mb-4 text-xl font-bold text-center sm:text-2xl md:text-3xl">
        Голч дүн тооцоолох
      </h1>

      {/* Scale Selector */}
      <div className="mb-4 flex justify-center space-x-4">
        <label>
          <input
            type="radio"
            value="before2025"
            checked={scale === "before2025"}
            onChange={(e) => setScale(e.target.value)}
          />
          2025 оноос өмнө элссэн
        </label>
        <label>
          <input
            type="radio"
            value="after2025"
            checked={scale === "after2025"}
            onChange={(e) => setScale(e.target.value)}
          />
          2025 оноос хойш элссэн
        </label>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {semesters.map((semester, sIdx) => (
          <div
            key={sIdx}
            className="p-3 space-y-4 bg-gray-100 rounded-lg shadow sm:p-4"
          >
            {/* Semester Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold sm:text-lg md:text-xl">
                {semester.name}
              </h2>
              <button
                onClick={() => removeSemester(sIdx)}
                className="px-2 py-1 text-sm text-white bg-red-600 rounded sm:px-3 sm:text-sm hover:bg-red-700"
              >
                Устгах
              </button>
            </div>

            {/* Courses */}
            <div className="space-y-3">
              {semester.courses.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-3"
                >
                  <input
                    type="text"
                    placeholder="Хичээлийн нэр"
                    value={course.name}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "name", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded sm:px-3 sm:py-2 sm:text-base"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Кредит"
                    value={course.credits}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "credits", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded sm:px-3 sm:py-2 sm:text-base"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Дүн"
                    value={course.score}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "score", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border rounded sm:px-3 sm:py-2 sm:text-base"
                  />
                  <button
                    onClick={() => removeCourse(sIdx, cIdx)}
                    className="text-sm text-red-500 sm:text-sm hover:text-red-700"
                  >
                    Устгах
                  </button>
                </div>
              ))}
            </div>

            {/* Add Course & Semester GPA */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => addCourse(sIdx)}
                className="px-2 py-1 text-sm text-white bg-primary rounded sm:px-3 sm:py-1.5 sm:text-sm hover:bg-blue-700"
              >
                Хичээл нэмэх
              </button>
              <div className="text-sm font-semibold sm:text-base">
                Семестрийн голч:{" "}
                <span className="text-blue-600">
                  {calculateSemesterGPA(semester.courses)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={addSemester}
          className="px-3 py-1.5 text-sm text-white bg-green-600 rounded sm:px-4 sm:py-2 sm:text-base hover:bg-green-700"
        >
          Семестр нэмэх
        </button>
        <div className="text-base font-bold sm:text-lg">
          Хуримтлагдсан голч:{" "}
          <span className="text-blue-600">{calculateCumulativeGPA()}</span>
        </div>
      </div>
    </div>
  );
}