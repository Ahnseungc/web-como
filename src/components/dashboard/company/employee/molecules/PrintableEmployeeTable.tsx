type PrintableEmployee = {
  name: string;
  email: string;
  department: string;
  createdDate: string;
};

export default function PrintableEmployeeTable({ employees }: { employees: PrintableEmployee[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>No</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>이름</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>이메일</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>부서</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>가입일</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{employee.name}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{employee.email}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{employee.department}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {employee.createdDate ? new Date(employee.createdDate).toISOString().split("T")[0] : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}