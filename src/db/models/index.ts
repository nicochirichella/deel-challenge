import Profile from "./Profile";
import Contract from "./Contract";
import Job from "./Job";

const models = {
  Profile,
  Contract,
  Job,
};

const associate = () => {
  Object.values(models).forEach((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};

export { associate, models };
