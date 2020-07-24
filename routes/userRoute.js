import UserController from '../controllers/userController';
import AuthMiddleware from '../middlewares/authMiddleware';
import { 
  signup,
  signin,
  tokenSignin,
  checkEmail,
  resetPassword,
  changePassword,
} from '../middlewares/validationMiddleware';

export default router => {
  router.post('/auth/signup', signup, UserController.postSignup);
  router.post('/auth/login', signin, UserController.postLogin);
  router.post('/auth/token-login', tokenSignin, UserController.tokenLogin);
  /**
   * @param /auth/confrim-email?email_token=<email token>
   */
  router.get('/auth/confirm-email', UserController.confirmEmail);
  router.get(
    '/auth/resend-confirm-email',
    AuthMiddleware.auth,
    UserController.resendConfirmEmail,
  );
  router.post(
    '/auth/forget-password',
    checkEmail,
    UserController.forgetPassword,
  );
  /**
   * @param /auth/reset-password?email_token=<email token>
   */
  router.patch(
    '/auth/reset-password',
    resetPassword,
    UserController.resetPassword,
  );
  router.patch(
    '/auth/change-password',
    AuthMiddleware.auth,
    AuthMiddleware.emailConfrim,
    changePassword,
    UserController.changeOldPassword,
  );
  router.patch(
    '/save/download',
    AuthMiddleware.auth,
    AuthMiddleware.emailConfrim,
    UserController.saveDownload,
  );
  router.get(
    '/get/downloads',
    AuthMiddleware.auth,
    UserController.getDownloads,
  );
  router.get(
    '/get/subscription',
    AuthMiddleware.auth,
    UserController.getSubscription,
  );
  router.delete(
    '/delete/downloads',
    AuthMiddleware.auth,
    UserController.deleteDownloads,
  );
  router.get(
    '/download',
    UserController.download,
  );
  return router;
};
