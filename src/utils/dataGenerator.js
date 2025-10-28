import { faker } from '@faker-js/faker';

export function generateTableData(numRows = 100) {
  // Define columns for the table
  const columns = [
    { id: 'name', ordinalNo: 1, title: 'Name', type: 'string', width: 200 },
    { id: 'age', ordinalNo: 2, title: 'Age', type: 'number', width: 100 },
    { id: 'email', ordinalNo: 3, title: 'Email', type: 'string', width: 250 },
    { id: 'department', ordinalNo: 4, title: 'Department', type: 'select',
      options: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'] },
    { id: 'Manager', ordinalNo: 5, title: 'Manager', type: 'boolean' },
    { id: 'recruitmentStatus', ordinalNo: 6, title: 'Recruitment Status', type: 'select', width: 150, 
      options: ['Active', 'Inactive', 'Pending', 'Completed'] }
  ];

  // Generate data rows
  const data = [];
  
  for (let i = 0; i < numRows; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      department: faker.helpers.arrayElement(['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']),
      Manager: faker.helpers.arrayElement([true, false]),
      recruitmentStatus: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending', 'Completed']),
    });
  }

  return { columns, data };
}
