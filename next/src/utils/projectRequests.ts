"use client";

import {
  BoardCreateRequestDto,
  ColumnCreateRequestDto,
  ColumnSwapRequestDto,
  ColumnUpdateRequestDto,
  TaskCreateRequestDto,
  TaskSwapRequestDto,
  TaskUpdateRequestDto,
} from "@/types/dtos";

/**
 * Sends a POST request to create a new board.
 * 
 * @param {BoardCreateRequestDto} body The payload containing the data for creating the board.
 * 
 * @returns {Promise} Promise that resolves to the response of the request.
 */
export const fetchCreateBoard = (body: BoardCreateRequestDto): Promise<Response> => {
  return fetch("/api/board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/** 
 * Sends a DELETE request to delete a board by its ID. 
 * 
 * @param {number} id The ID of the board to be deleted.
 * 
 * @returns {Promise} Promise that resolves to the response of the request. 
 */ 
export const fetchDeleteBoard = (id: number): Promise<Response> => {
  return fetch(`/api/board/${id}`, {
    method: "DELETE",
  });
};

/**
 * Makes a POST request to create a new column with the provided data.
 *
 * @param {ColumnCreateRequestDto} body The data required to create a new column.
 * 
 * @returns {Promise<Response>} Promise that resolves to the response from the API.
 */
export const fetchCreateColumn = (body: ColumnCreateRequestDto): Promise<Response> => {
  return fetch("/api/column", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Makes a PUT request to update the column with the provided data.
 *
 * @param {number} id - The ID of the column to be updated.
 * @param {ColumnUpdateRequestDto} body - The data required to update the column.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchUpdateColumn = (
  id: number,
  body: ColumnUpdateRequestDto,
): Promise<Response> => {
  return fetch(`/api/column/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Makes a PUT request to swap the position of a column.
 *
 * @param {number} id - The ID of the column to be swapped.
 * @param {ColumnSwapRequestDto} body - The data required to swap the column position.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchSwapColumn = (id: number, body: ColumnSwapRequestDto): Promise<Response> => {
  return fetch(`/api/column:swap/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Makes a DELETE request to delete a column with the provided ID.
 *
 * @param {number} id - The ID of the column to be deleted.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchDeleteColumn = (id: number): Promise<Response> => {
  return fetch(`/api/column/${id}`, {
    method: "DELETE",
  });
};

/**
 * Makes a POST request to create a new task with the provided data.
 *
 * @param {TaskCreateRequestDto} body - The data required to create a new task.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchCreateTask = (body: TaskCreateRequestDto): Promise<Response> => {
  return fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Makes a DELETE request to delete a task with the provided ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 * 
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchDeleteTask = (id: number): Promise<Response> => {
  return fetch(`/api/task/${id}`, {
    method: "DELETE",
  });
};

/**
 * Makes a PUT request to swap the position of a task.
 *
 * @param {number} id - The ID of the task to be swapped.
 * @param {TaskSwapRequestDto} body - The data required to swap the task position.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchSwapTask = (id: number, body: TaskSwapRequestDto): Promise<Response> => {
  return fetch(`/api/task:swap/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

/**
 * Makes a PUT request to update a task with the provided data.
 *
 * @param {number} id - The ID of the task to be updated.
 * @param {TaskUpdateRequestDto} body - The data required to update the task.
 *
 * @returns {Promise<Response>} - A Promise that resolves to the response from the API.
 */
export const fetchUpdateTask = (id: number, body: TaskUpdateRequestDto): Promise<Response> => {
  return fetch(`/api/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};