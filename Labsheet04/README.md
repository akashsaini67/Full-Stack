# Lab Sheet 4: Node.js Core Modules & Programming
**COER University, Roorkee — Department of Computer Science & Engineering**  
**Course:** Full Stack Web Development (Node.js Essentials)

---

## 📌 Overview of Tasks & Files

| Task # | Topic | File(s) | Key Node.js APIs Used | Command to Run |
|---|---|---|---|---|
| **Task 1** | Custom Modules | `sum.js`, `even-odd.js`, `app1.js` | `module.exports`, `require()` | `node app1.js` |
| **Task 2** | File System (CRUD) | `file-ops.js` | `fs.writeFile`, `fs.appendFile`, `fs.readFile`, `fs.rename` | `node file-ops.js` |
| **Task 3** | Directory Operations | `dir-ops.js` | `fs.mkdir`, `fs.writeFile`, `fs.readdir`, `fs.unlink` | `node dir-ops.js` |
| **Task 4** | Path Module | `path-demo.js` | `path.dirname`, `path.basename`, `path.extname`, `path.resolve` | `node path-demo.js` |
| **Task 5** | OS Module Report | `sys-report.js` | `os.platform`, `os.arch`, `os.totalmem`, `os.freemem`, `os.cpus`, `os.uptime` | `node sys-report.js` |
| **Task 6** | Custom EventEmitter | `order-events.js` | `events.EventEmitter`, `.on()`, `.emit()` | `node order-events.js` |
| **Task 7** | HTTP Manual Routing | `server.js` | `http.createServer`, `req.url`, `res.writeHead`, `res.end` | `node server.js` |
| **Task 8** | Query String Parsing | `query-demo.js`, `server.js` | `require('url').parse(req.url, true).query` | `node query-demo.js` |
| **Task 9** | Streams & Buffers | `stream-demo.js` | `fs.createReadStream`, `data`, `end` | `node stream-demo.js` |
| **Task 10** | External Package (npm) | `id-gen.js`, `package.json` | `nanoid@3` | `node id-gen.js` |
| **Task 11** | Command-Line Arguments | `calc-cli.js` | `process.argv` | `node calc-cli.js 10 5 +` |
| **Task 12** | Environment Variables | `env-demo.js` | `process.env.PORT` | `node env-demo.js` |

---

## 💻 Task Details & Terminal Output Logs

### Task 1: Custom Modules (`sum.js`, `even-odd.js`, `app1.js`)
- **Execution:** `node app1.js`
- **Output:**
```
==============================================
Task 1: Testing Custom Modules in Node.js
==============================================

[Sum Module]       18 + 24 = 42
[Even-Odd Module]  18 is Even
[Even-Odd Module]  24 is Even
[Even-Odd Module]  7 is Odd
[Even-Odd Module]  15 is Odd

Task 1 execution completed successfully!
```

---

### Task 2: File System — CRUD on a Text File (`file-ops.js`)
- **Execution:** `node file-ops.js`
- **Output:**
```
==============================================
Task 2: File System CRUD Operations
==============================================

[Step 1] Created "student.txt" and wrote student details.
[Step 2] Appended course and university info to "student.txt".

[Step 3] Successfully read file content:
--- FILE CONTENT START ---
Name: Akash Saini
Roll Number: 22001015001
Course: Full Stack Web Development (CSE)
University: COER University, Roorkee
--- FILE CONTENT END ---

[Step 4] File successfully renamed from "student.txt" to "profile.txt"!

Task 2 completed successfully.
```

---

### Task 3: Directory Operations (`dir-ops.js`)
- **Execution:** `node dir-ops.js`
- **Output:**
```
==============================================
Task 3: Directory Operations in Node.js
==============================================

[Step 1] Created directory: "uploads"
[Step 2] Created 3 empty files: file1.txt, file2.txt, file3.txt

[Step 3] Files currently in "uploads" folder:
   1. file1.txt
   2. file2.txt
   3. file3.txt

[Step 4] Deleting "file2.txt"...
Successfully deleted "file2.txt"
Remaining files in "uploads" folder: [ 'file1.txt', 'file3.txt' ]

Task 3 completed successfully.
```

---

### Task 4: Path Module (`path-demo.js`)
- **Execution:** `node path-demo.js`
- **Output:**
```
Original Path: "/home/user/data/report.pdf"

1. Directory Name (path.dirname):  /home/user/data
2. Base Name (path.basename):       report.pdf
   Base Name without Extension:     report
3. Extension (path.extname):        .pdf

4. Relative Path:                   ./data/monthly-report.pdf
   Resolved Absolute Path:          D:\Full Stack\Labsheet04\data\monthly-report.pdf
```

---

### Task 5: OS Diagnostics Report (`sys-report.js`)
- **Execution:** `node sys-report.js`
- **Output:**
```
OS Platform:         win32 (Windows_NT)
Architecture:        x64
Total RAM:           7.79 GB
Free RAM:            2.76 GB
Memory Usage:        64.6%
CPU Model:           Intel(R) Core(TM) i3-6006U CPU @ 2.00GHz
Number of CPU Cores: 4
System Uptime:       3781.16 minutes (~63.02 hours)
```

---

### Task 6: Events Module — Custom EventEmitter (`order-events.js`)
- **Execution:** `node order-events.js`
- **Output:**
```
🧾 ORDER RECEIPT
   Order ID:     #ORD-101
   Item Name:    Sony WH-1000XM5 Headphones
   Amount:       ₹26,990
   Payment:      CONFIRMED & PROCESSED

🧾 ORDER RECEIPT
   Order ID:     #ORD-102
   Item Name:    Apple Watch Series 9
   Amount:       ₹41,900
   Payment:      CONFIRMED & PROCESSED

🧾 ORDER RECEIPT
   Order ID:     #ORD-103
   Item Name:    Keychron K2 Mechanical Keyboard
   Amount:       ₹7,499
   Payment:      CONFIRMED & PROCESSED
```

---

### Task 7 & Task 8: HTTP Server with Manual Routing & Query Parsing (`server.js`)
- **Execution:** `node server.js`
- **Endpoints:**
  1. `http://localhost:3000/` &rarr; HTML Welcome greeting
  2. `http://localhost:3000/students` &rarr; JSON array of 3 students
  3. `http://localhost:3000/students/1` &rarr; JSON object for Student #1
  4. `http://localhost:3000/students/99` &rarr; 404 JSON error
  5. `http://localhost:3000/search?keyword=node` &rarr; JSON response echoing query string `keyword`

---

### Task 9: Reading Large File with Streams (`stream-demo.js`)
- **Execution:** `node stream-demo.js`
- **Output:**
```
[Step 1] Generating text file with 60 lines...
[Step 1] File successfully written to: large-file.txt
Total generated file size: 7080 bytes.

[Step 2] Reading file using fs.createReadStream...
[Stream Event: 'data'] Chunk #1 received -> Size: 512 bytes
...
[Stream Event: 'data'] Chunk #14 received -> Size: 424 bytes
[Stream Event: 'end'] Completed reading the entire stream.
Summary: Received 14 chunks, totaling 7080 bytes.
```

---

### Task 10: npm and External Package nanoid (`id-gen.js`)
- **Execution:** `node id-gen.js`
- **Output:**
```
Generating 5 unique IDs using nanoid:
  ID #1:  8cGkBbyYL_Tw0W57D7zo2  (Length: 21 characters)
  ID #2:  FUe5pJX2E8v4n_1CiKwIA  (Length: 21 characters)
  ID #3:  KkNlF_OVvTjEhUgOyf-QI  (Length: 21 characters)
  ID #4:  HPE00BsZ5UTwMNGJd28Y1  (Length: 21 characters)
  ID #5:  nV7NlVONhEPUEXIZ7CN8Y  (Length: 21 characters)
```

---

### Task 11: Command-Line Arguments Calculator (`calc-cli.js`)
- **Execution:** `node calc-cli.js 15 3 +` &rarr; `18`
- **Execution:** `node calc-cli.js 45 5 /` &rarr; `9`

---

### Task 12: Environment Variables (`env-demo.js`)
- **Execution (Default Port 4000):** `node env-demo.js`
- **Execution (Custom Port in PowerShell):** `$env:PORT=5000; node env-demo.js`
- **Execution (Custom Port in CMD):** `set PORT=5000 && node env-demo.js`

---

## ⚡ Run All Tasks in One Click
You can run all automated scripts at once using the master test runner:
```bash
node test-all.js
```
