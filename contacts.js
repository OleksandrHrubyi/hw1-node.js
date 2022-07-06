import chalk from "chalk";
import { join } from "path";
import { promises as fs } from "fs";
import { generate } from "shortid";

const contactsPath = join("db", "contacts.json");

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath);
      const result = JSON.parse(data)
      console.table(result);
      return result
    
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(data);
    const user = result.find((el) => el.id === Number(contactId));
    console.table(user);
    return user
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
      const result = JSON.parse(data);
      const allData = result.filter((el) => el.id !== Number(contactId))
      console.table(allData);
      await fs.writeFile(contactsPath, JSON.stringify(allData, null, "\t"));
      return allData
    
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const user = {
    id: generate(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const arr = JSON.parse(data);
    arr.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(arr, null, "\t"));
      console.table(arr);
      return arr
  } catch (error) {
    console.log(error);
  }
}

export default { listContacts, getContactById, removeContact, addContact };