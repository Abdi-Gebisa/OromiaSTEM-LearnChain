use anchor_lang::prelude::*;

// This is a valid temporary ID so the source parses. Generate your own program
// keypair, then run `anchor keys sync` before building or deploying.
declare_id!("11111111111111111111111111111111");

#[program]
pub mod learning_achievement {
    use super::*;

    /// Stores proof that a wallet submitted a completed learning challenge.
    /// Only a SHA-256 digest, wallet public key, and timestamp are stored.
    pub fn create_achievement(
        ctx: Context<CreateAchievement>,
        achievement_hash: [u8; 32],
    ) -> Result<()> {
        let record = &mut ctx.accounts.achievement;
        record.authority = ctx.accounts.authority.key();
        record.achievement_hash = achievement_hash;
        record.created_at = Clock::get()?.unix_timestamp;
        emit!(AchievementCreated {
            authority: record.authority,
            achievement_hash,
            created_at: record.created_at,
        });
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(achievement_hash: [u8; 32])]
pub struct CreateAchievement<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + AchievementRecord::INIT_SPACE,
        seeds = [b"achievement", authority.key().as_ref(), achievement_hash.as_ref()],
        bump
    )]
    pub achievement: Account<'info, AchievementRecord>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct AchievementRecord {
    pub authority: Pubkey,
    pub achievement_hash: [u8; 32],
    pub created_at: i64,
}

#[event]
pub struct AchievementCreated {
    pub authority: Pubkey,
    pub achievement_hash: [u8; 32],
    pub created_at: i64,
}
