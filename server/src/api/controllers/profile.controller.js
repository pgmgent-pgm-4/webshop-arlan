import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all categories
*/
const getProfiles = async (req, res, next) => {
	try {
		// Get all orders from database
		const profiles = await database.Profile.findAll();

		// Send response
		res.status(200).json(profiles);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific profile
*/
const getProfileById = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { userId } = req.params;
		// Get specific profile from database

  const profile = await database.Profile.findAll({
   where: {
    UserId: userId 
   }
  });

		// Profile with profileId was not found
		if (!profile) {
			throw new HTTPError(`Could not find the profile with id ${profileId}!`, 404);
		}
		// Send response
		res.status(200).json(profile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new profile
*/
const createProfile = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a profile
		const createdProfile = await database.Profile.create(model);
		// Send response
		res.status(201).json(createdProfile);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting profile
*/
const updateProfile = async (req, res, next) => {
	try {
		// Get profile parameter
		const { profileId } = req.params;
		// Get specific profile from database
		const profile = await database.Profile.findByPk(profileId);

		if (!profile) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Update a specific profile
		const model = req.body;
		const updatedProfile = await database.Profile.update(model, {
			where: {
				id: profileId,
			},
		});

		// Send response
		res.status(200).json(updatedProfile[0] === 1 ? 'Succesfully updated profile' : 'Error updating profile');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting profile
*/
const deleteProfile = async (req, res, next) => {
	try {
		// Get profileId parameter
		const { profileId } = req.params;
		// Get specific profileId from database
		const profile = await database.Profile.findByPk(profileId);

		if (!profile) {
			throw new HTTPError(`Could not found the profile with id ${profileId}!`, 404);
		}

		// Delete a profile with specified id
		const message = await database.Profile.destroy({
			where: {
				id: profileId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully deleted profile' : 'Error deleting profile');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createProfile, getProfiles, getProfileById, updateProfile, deleteProfile,
};
