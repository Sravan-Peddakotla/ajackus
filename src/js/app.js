let employees = [
  { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice@company.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@company.com", department: "Engineering", role: "Developer" },
  { id: 3, firstName: "Johnson", lastName: "Alice", email: "Johnson@company.com", department: "HR", role: "Manager" },
  { id: 4, firstName: "Smith", lastName: "Bob", email: "Smith@company.com", department: "Engineering", role: "Developer" },
  { id: 5, firstName: "Martinez", lastName: "Johnson", email: "alice@company.com", department: "HR", role: "Manager" },
  { id: 6, firstName: "Bob", lastName: "Smith", email: "bob@company.com", department: "Engineering", role: "Developer" },
  { id: 7, firstName: "Elena", lastName: "Foster", email: "elena.foster@company.com", department: "Marketing", role: "Analyst" },
  { id: 8, firstName: "Marcus", lastName: "Reed", email: "marcus.reed@company.com", department: "Sales", role: "Executive" },
  { id: 9, firstName: "Priya", lastName: "Kumar", email: "priya.kumar@company.com", department: "Finance", role: "Accountant" },
  { id: 10, firstName: "James", lastName: "Nguyen", email: "james.nguyen@company.com", department: "IT", role: "SysAdmin" },
  { id: 11, firstName: "Sophia", lastName: "Lopez", email: "sophia.lopez@company.com", department: "Legal", role: "Advisor" },
  { id: 12, firstName: "Liam", lastName: "Walker", email: "liam.walker@company.com", department: "Engineering", role: "QA Tester" },
  { id: 13, firstName: "Zara", lastName: "Ali", email: "zara.ali@company.com", department: "Design", role: "UX Designer" },
  { id: 14, firstName: "Noah", lastName: "Patel", email: "noah.patel@company.com", department: "Product", role: "Product Manager" },
  { id: 15, firstName: "Maya", lastName: "Singh", email: "maya.singh@company.com", department: "HR", role: "Recruiter" },
  { id: 16, firstName: "Ethan", lastName: "Brown", email: "ethan.brown@company.com", department: "Customer Support", role: "Representative" },
  { id: 17, firstName: "Aarav", lastName: "Mehta", email: "aarav.mehta@company.com", department: "Engineering", role: "Backend Developer" },
  { id: 18, firstName: "Emily", lastName: "Clark", email: "emily.clark@company.com", department: "Marketing", role: "Content Strategist" },
  { id: 19, firstName: "Daniel", lastName: "Wong", email: "daniel.wong@company.com", department: "IT", role: "Network Engineer" },
  { id: 20, firstName: "Fatima", lastName: "Hassan", email: "fatima.hassan@company.com", department: "Design", role: "Graphic Designer" },
  { id: 21, firstName: "Victor", lastName: "Hughes", email: "victor.hughes@company.com", department: "Sales", role: "Sales Manager" },
  { id: 22, firstName: "Isabella", lastName: "Martinez", email: "isabella.martinez@company.com", department: "HR", role: "Coordinator" },
  { id: 23, firstName: "Haruto", lastName: "Tanaka", email: "haruto.tanaka@company.com", department: "Engineering", role: "Frontend Developer" },
  { id: 24, firstName: "Nina", lastName: "Reddy", email: "nina.reddy@company.com", department: "Legal", role: "Paralegal" },
  { id: 25, firstName: "Thomas", lastName: "O'Brien", email: "thomas.obrien@company.com", department: "Finance", role: "Financial Analyst" },
  { id: 26, firstName: "Laila", lastName: "Khan", email: "laila.khan@company.com", department: "Customer Support", role: "Support Lead" }
];

let currentPage = 1;
let pageSize = 10;
let filters = {};
let searchQuery = '';
let sortKey = '';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderEmployees();
  });
  renderEmployees();
});

function renderEmployees() {
  const list = document.getElementById('employeeList');
  let filtered = employees
    .filter(emp =>
      (!filters.firstName || emp.firstName.toLowerCase().includes(filters.firstName)) &&
      (!filters.department || emp.department.toLowerCase().includes(filters.department)) &&
      (!filters.role || emp.role.toLowerCase().includes(filters.role))
    )
    .filter(emp =>
      emp.firstName.toLowerCase().includes(searchQuery) ||
      emp.lastName.toLowerCase().includes(searchQuery) ||
      emp.email.toLowerCase().includes(searchQuery)
    );

  if (sortKey) {
    filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  list.innerHTML = paginated.map(emp => `
  <div class="employee-card">
    <p><strong>${emp.firstName} ${emp.lastName}</strong> (ID_${emp.id})</p>
    <p>${emp.email}</p>
    <p>${emp.department} | ${emp.role}</p>
    <button onclick="editEmployee(${emp.id})" class="button">
      <i class="fa fa-pen fa-sm"></i> Edit
    </button>
    <button onclick="deleteEmployee(${emp.id})" class="button">
      <i class="fa fa-trash fa-sm"></i> Delete
    </button>
  </div>
`).join('');

  // Update page info
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages || 1}`;
}


function nextPage() {
  const totalPages = Math.ceil(getFilteredEmployees().length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderEmployees();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees();
  }
}

function getFilteredEmployees() {
  return employees
    .filter(emp =>
      (!filters.firstName || emp.firstName.toLowerCase().includes(filters.firstName)) &&
      (!filters.department || emp.department.toLowerCase().includes(filters.department)) &&
      (!filters.role || emp.role.toLowerCase().includes(filters.role))
    )
    .filter(emp =>
      emp.firstName.toLowerCase().includes(searchQuery) ||
      emp.lastName.toLowerCase().includes(searchQuery) ||
      emp.email.toLowerCase().includes(searchQuery)
    );
}


function changePageSize() {
  pageSize = parseInt(document.getElementById('pageSize').value);
  currentPage = 1;
  renderEmployees();
}


function editEmployee(id) {
  alert('Edit function can redirect to form.ftl with data prefilled');
}



function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
  }
}

function changePageSize() {
  pageSize = parseInt(document.getElementById('pageSize').value);
  currentPage = 1;
  renderEmployees();
}

function applyFilter() {
  filters.firstName = document.getElementById('filterFirstName').value.toLowerCase();
  filters.department = document.getElementById('filterDepartment').value.toLowerCase();
  filters.role = document.getElementById('filterRole').value.toLowerCase();
  closeFilter();
  renderEmployees();
}

function clearFilter() {
  filters = {};
  document.getElementById('filterFirstName').value = '';
  document.getElementById('filterDepartment').value = '';
  document.getElementById('filterRole').value = '';
  renderEmployees();
}

function applySort() {
  sortKey = document.getElementById('sortSelect').value;
  renderEmployees();
}

function openFilter() {
  document.getElementById('filterModal').classList.remove('hidden');
}

function closeFilter() {
  document.getElementById('filterModal').classList.add('hidden');
}

function openAddForm() {
  document.getElementById('addModal').classList.remove('hidden');
}

function closeAddForm() {
  document.getElementById('addModal').classList.add('hidden');
  document.querySelector('#addModal form').reset();
}

function submitAddForm(event) {
  event.preventDefault();

  const firstName = document.getElementById('addFirstName').value.trim();
  const lastName = document.getElementById('addLastName').value.trim();
  const email = document.getElementById('addEmail').value.trim();
  const department = document.getElementById('addDepartment').value.trim();
  const role = document.getElementById('addRole').value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    alert("All fields are required.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const newEmployee = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    department,
    role
  };

  employees.push(newEmployee);
  closeAddForm();
  renderEmployees();
}


function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;

  document.getElementById('editId').value = emp.id;
  document.getElementById('editFirstName').value = emp.firstName;
  document.getElementById('editLastName').value = emp.lastName;
  document.getElementById('editEmail').value = emp.email;
  document.getElementById('editDepartment').value = emp.department;
  document.getElementById('editRole').value = emp.role;

  document.getElementById('editModal').classList.remove('hidden');
}

function closeEditForm() {
  document.getElementById('editModal').classList.add('hidden');
  document.querySelector('#editModal form').reset();
}

function submitEditForm(event) {
  event.preventDefault();

  const id = parseInt(document.getElementById('editId').value);
  const firstName = document.getElementById('editFirstName').value.trim();
  const lastName = document.getElementById('editLastName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const department = document.getElementById('editDepartment').value.trim();
  const role = document.getElementById('editRole').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const index = employees.findIndex(emp => emp.id === id);
  if (index > -1) {
    employees[index] = { id, firstName, lastName, email, department, role };
  }

  closeEditForm();
  renderEmployees();
}
