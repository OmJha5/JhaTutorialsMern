import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditableCell from "./EditableCell"; // Import the new component
import { FiTrash } from "react-icons/fi"; // Trash icon from react-icons

export default function Tables({ tables, setTables }) {

  const addTable = () => {
    setTables([...tables, { id: crypto.randomUUID(), name: "", headers: [], data: [[]] }]);
  };

  const addColumn = (index) => {
    setTables(
      tables.map((table, i) => {
        if (i === index) {
          return {
            ...table,
            headers: [...table.headers, ""],
            data: table.data.map((row) => [...row, ""]),
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
            data: [...table.data, Array(table.headers.length).fill("")],
          };
        }
        return table;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Button onClick={addTable} className="bg-blue-600 text-white px-6 py-2 max-sm:px-3 max-sm:py-0 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
        Add Table
      </Button>
      {tables.map((table, index) => (
        <div key={table.id} className="!my-10 pt-4">
          {/* Table Name Input */}
          <Input
            className="text-center !text-2xl max-sm:!text-lg !py-3 h-fit rounded-none focus-visible:ring-0 bg-gray-100"
            value={table.name}
            onChange={(e) => {
              const newTables = [...tables];
              newTables[index].name = e.target.value;
              setTables(newTables);
            }}
            placeholder="Enter table name"
          />

          <div className="overflow-x-auto w-full">
            {/* Table Structure */}
            <table className="border border-gray-400 table min-w-full">
              {/* Table Headers */}
              <thead>
                <tr>
                  {table.headers.map((header, colIndex) => (
                    <th key={colIndex} className="border border-gray-300 text-lg font-medium max-sm:text-base max-sm:font-normal">
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
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="border border-gray-300 max-sm:text-sm">
                        <EditableCell
                          value={cell}
                          onUpdate={(newValue) => {
                            const newTables = [...tables];
                            newTables[index].data[rowIndex][colIndex] = newValue;
                            setTables(newTables);
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          {/* Add Row and Column Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={() => addRow(index)} className="bg-green-600 text-white px-6 py-2 max-sm:px-3 max-sm:py-0 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
              Add Row
            </Button>
            <Button onClick={() => addColumn(index)} className="bg-green-600 text-white px-6 py-2 max-sm:px-3 !max-sm:py-0 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
              Add Column
            </Button>
            <Button className="px-4 py-2 max-sm:px-3 max-sm:py-0 rounded-lg text-red-600 bg-red-100 hover:bg-red-200 transition-all duration-300" onClick={() => deleteTableHandler(index)}>
              <FiTrash /> {/* Trash icon */}
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
