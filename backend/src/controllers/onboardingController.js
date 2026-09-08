import * as onboardingService from "../services/onboardingService.js";

export const syncUser = async (req, res, next) => {
  try {
    const user = await onboardingService.syncUser(req.user);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    
    const user = await onboardingService.updateRole(req.user, role);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const createEmployeeProfile = async (req, res, next) => {
  try {
    const profile = await onboardingService.createEmployeeProfile(req.user, req.body);

    return res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export const createRecruiterProfile = async (req, res, next) => {
  try {
    const profile = await onboardingService.createRecruiterProfile(req.user, req.body);

    return res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}