import { join } from "path";
import { promises as fs } from "fs";
import { generate } from "shortid";

const contactsPath = join("db", "contacts.json");

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data)
    
      return result
    
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const user = data.find((el) => el.id === Number(contactId));
    if (!user) {
      return null
    }
    console.table(user);
    return user
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
      const data = await listContacts();
      const allData = data.filter((el) => el.id !== Number(contactId))
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
    const data = await listContacts();
    data.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "\t"));
      console.table(data);
      return data
  } catch (error) {
    console.log(error);
  }
}

export default { listContacts, getContactById, removeContact, addContact };