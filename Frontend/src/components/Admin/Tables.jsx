import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditableCell from "./EditableCell"; // Import the new component
import { FiTrash } from "react-icons/fi"; // Trash icon from react-icons

export default function Tables({tables , setTables}) {

  const addTable = () => {
    setTables([...tables, { id: crypto.randomUUID() , name: "", headers: [], rows: [[]] }]);
  };

  const addColumn = (index) => {
    setTables(
      tables.map((table, i) => {
        if (i === index) {
          return {
            ...table,
            headers: [...table.headers, ""],
            rows: table.rows.map((row) => [...row, ""]),
          };
        }
        return table;
      })
    );
  };

  const deleteTableHandler = (index) => {
    let allTables = tables.filter((table, ind) => index != ind)
    setTables(allTables);
  }

  const addRow = (index) => {
    setTables(
      tables.map((table, i) => {
        if (i === index) {
          return {
            ...table,
            rows: [...table.rows, Array(table.headers.length).fill("")],
          };
        }
        return table;
      })
    );
  };

  return (
    <div className="space-y-6 min-h-screen ">
      <Button onClick={addTable} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
        Add Table
      </Button>
      {tables.map((table, index) => (
        <div key={table.id} className="!my-10">
          {/* Table Name Input */}
          <Input
            className="text-center !text-2xl !py-3 h-fit rounded-none focus-visible:ring-0 bg-gray-100"
            value={table.name}
            onChange={(e) => {
              const newTables = [...tables];
              newTables[index].name = e.target.value;
              setTables(newTables);
            }}
            placeholder="Enter table name"
          />

          {/* Table Structure */}
          <table className="table-auto w-full border border-gray-400">
            {/* Table Headers */}
            <thead>
              <tr >
                {table.headers.map((header, colIndex) => (
                  <th key={colIndex} className="border border-gray-300 text-lg font-medium">
                    <EditableCell
                      value={header}
                      onUpdate={(newValue) => {
                        const newTables = [...tables];
                        newTables[index].headers[colIndex] = newValue;
                        setTables(newTables);
                      }}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="flex-1">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border border-gray-300">
                      <EditableCell
                        value={cell}
                        onUpdate={(newValue) => {
                          const newTables = [...tables];
                          newTables[index].rows[rowIndex][colIndex] = newValue;
                          setTables(newTables);
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>

          {/* Add Row and Column Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={() => addRow(index)} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
              Add Row
            </Button>
            <Button onClick={() => addColumn(index)} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
              Add Column
            </Button>
            <Button className="px-4 py-2 rounded-lg text-red-600 bg-red-100 hover:bg-red-200 transition-all duration-300" onClick={() => deleteTableHandler(index)}>
              <FiTrash /> {/* Trash icon */}
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
