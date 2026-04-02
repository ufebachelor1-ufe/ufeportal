import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

// --- TIME SLOTS ---
const TIME_SLOTS = [
  { start: "07:40", end: "08:30" },
  { start: "08:40", end: "09:30" },
  { start: "09:40", end: "10:30" },
  { start: "10:40", end: "11:30" },
  { start: "11:40", end: "12:30" },
  { start: "12:40", end: "13:30" },
  { start: "14:20", end: "15:10" },
  { start: "15:20", end: "16:10" },
  { start: "16:20", end: "17:10" },
  { start: "17:20", end: "18:10" },
  { start: "18:20", end: "19:10" },
  { start: "19:20", end: "20:10" }
];

// --- GET FLOOR NUMBER FROM ROOM ---
function getFloorNumber(room) {
  const match = room.match(/\d+/);
  if (!match) return null;
  return Math.floor(parseInt(match[0], 10) / 100);
}

// --- SORT ROOMS ASCENDING ---
function sortRoomsAsc(rooms) {
  return rooms.sort((a, b) => {
    const na = parseInt(a.match(/\d+/)?.[0] || 0, 10);
    const nb = parseInt(b.match(/\d+/)?.[0] || 0, 10);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });
}

// --- GROUP ROOMS BY FLOOR RANGE ---
function groupRoomsByFloor(rooms) {
  const groups = {
    "1–5": [],
    "6–9": [],
    "10-14": []
  };

  rooms.forEach(room => {
    const floor = getFloorNumber(room);
    if (floor >= 1 && floor <= 5) groups["1–5"].push(room);
    else if (floor >= 6 && floor <= 9) groups["6–9"].push(room);
    else groups["10-14"].push(room);
  });

  // Sort each group
  for (const key in groups) {
    groups[key] = sortRoomsAsc(groups[key]);
  }

  return groups;
}

// --- TIME OVERLAP ---
function overlaps(classStart, classEnd, slotStart, slotEnd) {
  return classStart < slotEnd && classEnd > slotStart;
}

export default function RoomAvailability() {
  const [day, setDay] = useState("Даваа");
  const [schedule, setSchedule] = useState([]);
  const [roomsByGroup, setRoomsByGroup] = useState({
    "1–5": [],
    "6–9": [],
    "10-14": []
  });

  useEffect(() => {
    fetchSchedule();
  }, [day]);

  async function fetchSchedule() {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("day", day);

    if (error) return console.error(error);

    setSchedule(data);

    const uniqueRooms = [...new Set(data.map(r => r.room))];
    const grouped = groupRoomsByFloor(uniqueRooms);

    setRoomsByGroup(grouped);
  }

  return (
    <div className="p-4 overflow-auto rounded-lg shadow bg-gray-50">
      {/* Day selector + legend */}
      <div className="flex items-center mb-4 space-x-6">
        <select
          value={day}
          onChange={e => setDay(e.target.value)}
          className="px-3 py-1 text-sm bg-white border rounded-md"
        >
          {["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
            <span>Хичээлтэй</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-green-200 rounded-sm"></div>
            <span>Хичээлгүй</span>
          </div>
        </div>
      </div>

      {/* ROOM TABLES */}
      <div className="overflow-auto border rounded-lg">
        {Object.entries(roomsByGroup).map(([groupName, rooms]) => (
          rooms.length > 0 && (
            <div key={groupName} className="mb-8">
              <h2 className="sticky top-0 z-20 px-2 py-1 font-bold bg-gray-200 border-b">
                {groupName} давхар
              </h2>

              {/* Header */}
              <div className="sticky z-10 flex bg-gray-100 border-b top-7">
                <div className="w-20 py-1 text-sm font-semibold text-center border-r">
                  Цаг
                </div>
                {rooms.map(room => (
                  <div
                    key={room}
                    className="flex-1 py-1 text-sm font-semibold text-center border-r bg-gray-50"
                  >
                    {room}
                  </div>
                ))}
              </div>

              {/* Grid */}
              {TIME_SLOTS.map((slot, idx) => (
                <div key={idx} className="flex border-b">
                  <div className="sticky left-0 z-10 w-20 py-1 text-sm font-medium text-center bg-gray-100 border-r">
                    {slot.start}-{slot.end}
                  </div>

                  {rooms.map(room => {
                    const occupied = schedule.some(s =>
                      s.room === room &&
                      overlaps(s.start_time, s.end_time, slot.start, slot.end)
                    );

                    return (
                      <div
                        key={room + idx}
                        className={`flex-1 h-8 border-r ${
                          occupied ? "bg-red-400" : "bg-green-200"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
