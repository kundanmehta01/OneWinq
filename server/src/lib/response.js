export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = (res, data, message = 'Resource created successfully') => {
  return sendSuccess(res, data, message, 201);
};

export const sendPaginated = (res, items, pagination, message = 'Data retrieved successfully') => {
  const response = {
    success: true,
    message,
    data: {
      items,
      pagination,
    },
  };
  return res.status(200).json(response);
};
