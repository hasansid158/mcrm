import instanceApi from "./instanceApi";

import { isString } from "lodash";

//Timesheets
export const createTimeSheet = async (body) => {

  const {
    files,
    ...filterBody
  } = body;

  const payload = {
    ...filterBody,
    olaTarget: isString(body?.olaTarget) ? null : body?.olaTarget,
    slaTarget: isString(body?.slaTarget) ? null : body?.slaTarget,
    fullName: '',
  }

  const res = await instanceApi.post('Scheduler/CreateTimeSheet', payload);
  return res;
};
export const updateTimeSheet = async (body) => {

  const {
    serviceItems,
    ...updateData
  } = body;

  const res = await instanceApi.post('Scheduler/UpdateTimeSheet', updateData);
  return res;
};
export const uploadTimeSheetFiles = async (id, data) => {
  const res = await instanceApi.post(`Scheduler/UploadTimeSheetFiles/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export const getAllTimeSheets = async () => {
  const res = await instanceApi.get('Scheduler/TimeSheetsForDashboard');
  return res?.data;
};
export const getTimeSheetBookingById = async (timeSheetId) => {
  const res = await instanceApi.get(`Scheduler/GetTimeSheetBookingById/${timeSheetId}`);
  return res?.data;
};
export const removeTimesheet = async (timeSheetId) => {
  const res = await instanceApi.get(`Scheduler/RemoveTimesheet/${timeSheetId}`);
  return res?.data;
};
export const getTimeSheetStatuses = async () => {
  const res = await instanceApi.get('Scheduler/SchedulerStatuses/');
  return res?.data;
};

//Meeting
export const getAllMeetings = async () => {
  const res = await instanceApi.get('Scheduler/Meetings');
  return res?.data;
};
export const createMeeting = async (body) => {
  const res = await instanceApi.post('Scheduler/CreateMeeting', body);
  return res;
};
export const updateMeeting = async (body) => {
  const res = await instanceApi.post('Scheduler/UpdateMeeting', body);
  return res;
};

//Calls
export const getAllCalls = async () => {
  const res = await instanceApi.get('Scheduler/Calls');
  return res?.data;
};
export const createCall = async (body) => {
  const res = await instanceApi.post('Scheduler/CreateCall', body);
  return res;
};