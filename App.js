import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask("");
    }
  };

  const markTaskCompleted = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskItems(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks.splice(index, 1);
    setTaskItems(updatedTasks);
  };

  const handleStart = () => {
    // Función para poner la pantalla en modo completo
    const enableFullScreen = () => {
      const element = document.documentElement; // Elemento raíz (HTML)
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari/Chrome
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    };

    // Activar pantalla completa
    setTimeout(enableFullScreen, 500); // Ajusta el tiempo si es necesario
    setIsStarted(true); // Cambiar a la pantalla de tareas
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <Text
        style={[
          styles.taskText,
          item.completed && styles.taskCompletedText,
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.completeButton]}
          onPress={() => markTaskCompleted(index)}
        >
          <Text style={styles.buttonText}>
            {item.completed ? "Deshacer" : "Hecho"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteTask(index)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isStarted ? (
        // Pantalla de inicio
        <View style={styles.startScreen}>
          <Text style={styles.title}>To-Do App</Text>
          <Text style={styles.description}>Da clic para iniciar</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Empezar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Pantalla de tareas
        <View style={styles.taskScreen}>
          <Text style={styles.title}>To-Do App</Text>
          <FlatList
            data={taskItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.taskList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe una tarea"
              value={task}
              onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  startScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskScreen: {
    flex: 1,
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskCompletedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
