import { join } from "path";
import { promises as fs } from "fs";
import { nanoid } from 'nanoid'

const contactsPath = join("db", "contacts.json");

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data)
    console.log(result);
      return result
    
  } catch (error) {
    return error
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const user = data.find((el) => el.id === Number(contactId));
    if (!user) {
      return null
    }
    else {
      console.table(user);
      return user
    }
   
  } catch (error) {
    return error
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const idToRemove = data.find((el) => el.id === Number(contactId))
    if (idToRemove) {
      const allData = data.filter((el) => el.id !== Number(contactId))
      await fs.writeFile(contactsPath, JSON.stringify(allData, null, "\t"));
      console.log(allData);
      return allData
    }
    else {
      return null
    }
    } catch (error) {
     return error
  }
}


async function addContact(name, email, phone) {
  const user = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    const data = await listContacts();
    data.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "\t"));
      return data
  } catch (error) {
    return error
  }
}

export default { listContacts, getContactById, removeContact, addContact };