import Link from "next/link";
import Image from "next/image";
import { MouseEvent, useState } from 'react';
import { followUser, unfollowUser } from "@/lib/actions/user.actions";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  followButtonVisible?: boolean;
  unfollowButtonVisible?: boolean;
  onFollow?: () => Promise<void>;
  onUnfollow?: () => Promise<void>;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  followButtonVisible,
  unfollowButtonVisible,
  onFollow,
  onUnfollow,
  type,
}: Props) {
  const [followLoading, setFollowLoading] = useState(false);
  const [unfollowLoading, setUnfollowLoading] = useState(false);

  const handleFollow = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!onFollow) return;
    try {
      setFollowLoading(true);
      await onFollow();
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!onUnfollow) return;
    try {
      setUnfollowLoading(true);
      await onUnfollow();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setUnfollowLoading(false);
    }
  };

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='Profile Image'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== 'Community' && (
          <Link href='/profile/edit'>
            <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
              <Image
                src='/assets/edit.svg'
                alt='logout'
                width={16}
                height={16}
              />

              <p className='text-light-2 max-sm:hidden'>Edit</p>
            </div>
          </Link>
        )}
        {followButtonVisible && (
          <button onClick={handleFollow} className={`btn ${followLoading ? 'disabled' : ''}`} disabled={followLoading}>
            {followLoading ? 'Following...' : 'Follow'}
          </button>
        )}
        {unfollowButtonVisible && (
          <button onClick={handleUnfollow} className={`btn ${unfollowLoading ? 'disabled' : ''}`} disabled={unfollowLoading}>
            {unfollowLoading ? 'Unfollowing...' : 'Unfollow'}
          </button>
        )}
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
