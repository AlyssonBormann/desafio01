import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";

import { Task } from "./TasksList";

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (newTask: { taskId: number; taskNewTitle: string }) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskEdited, setTaskEdited] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEdit(true);
  }

  function handleCancelEditing() {
    setTaskEdited((prevState) => prevState);
    setIsEdit(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskEdited });
    setIsEdit(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEdit]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
        disabled={isEdit}
      >
        <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        <TextInput
          ref={textInputRef}
          style={task.done ? styles.taskTextDone : styles.taskText}
          value={taskEdited}
          editable={isEdit}
          onChangeText={setTaskEdited}
          onSubmitEditing={handleSubmitEditing}
        />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        {isEdit ? (
          <TouchableOpacity
            style={{ paddingRight: 4 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingRight: 4 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          style={{ paddingLeft: 4 }}
          disabled={isEdit}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEdit ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
